// api/form.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, service, message } = req.body;

  const token = '7598218261:AAGFAcVAEHuCq5lXHEKFTzpfgyFjMVWS5G0'; // ваш токен бота
  const chat_id = '7373169686'; // ваш chat id

  const text = `
📞 Заказ обратного звонка с сайта:
👤 Имя: ${name}
📱 Телефон: ${phone}
🕒 Удобное время для звонка: ${service}
📩 Сообщение: ${message || '-'}
`;

  try {
    const telegramURL = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(telegramURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(500).json({ error: 'Telegram error', details: error });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Request failed', details: error.message });
  }
}
