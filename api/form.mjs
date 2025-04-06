import fetch from 'node-fetch';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = '';
    await new Promise((resolve) => {
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', resolve);
    });

    const data = JSON.parse(body);
    const { name, phone, service, message, time, source } = data;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    // ❗ Подставляем напрямую токен и chat_id (или используй через process.env)
    const BOT_TOKEN = '7598218261:AAGFAcVAEHuCq5lXHEKFTzpfgyFjMVWS5G0';
    const CHAT_ID = '7373169686';

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

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Telegram Error:', result);
      throw new Error(result.description || 'Telegram API error');
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка обработки формы:', error);
    res.status(500).json({ error: error.message });
  }
}
