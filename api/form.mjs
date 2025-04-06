import fetch from 'node-fetch';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Считываем тело запроса вручную (важно для Vercel)
    let body = '';
    await new Promise((resolve) => {
      req.on('data', chunk => (body += chunk.toString()));
      req.on('end', resolve);
    });

    const data = JSON.parse(body);
    const { name, phone, service, message, time, source } = data;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('❌ BOT_TOKEN или CHAT_ID не установлены');
      return res.status(500).json({ error: 'Telegram credentials not set' });
    }

    // Формируем сообщение
    let telegramMessage = `📢 <b>Новая заявка с сайта</b>\n\n`;

    if (source === 'callback') {
      telegramMessage += `📞 <b>Заказ обратного звонка</b>\n`;
      telegramMessage += `▫️ <b>Имя:</b> ${name}\n`;
      telegramMessage += `▫️ <b>Телефон:</b> ${phone}\n`;
      if (time) telegramMessage += `▫️ <b>Время звонка:</b> ${time}\n`;
    } else {
      telegramMessage += `▫️ <b>Имя:</b> ${name}\n`;
      telegramMessage += `▫️ <b>Телефон:</b> ${phone}\n`;
      if (service) telegramMessage += `▫️ <b>Услуга:</b> ${service}\n`;
      if (message) telegramMessage += `▫️ <b>Сообщение:</b>\n${message}\n`;
    }

    telegramMessage += `⏱ <i>${new Date().toLocaleString()}</i>`;

    // Отправляем в Telegram
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!telegramRes.ok) {
      const errorData = await telegramRes.json();
      console.error('❌ Telegram API error:', errorData);
      throw new Error(errorData.description || 'Telegram API error');
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Ошибка обработки формы:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
}
