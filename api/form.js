// First install node-fetch: npm install node-fetch
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, service, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const BOT_TOKEN = process.env.BOT_TOKEN || 'your_default_bot_token';
    const CHAT_ID = process.env.CHAT_ID || 'your_default_chat_id';

    const telegramMessage = `
📢 <b>Новая заявка с сайта</b>
      
▫️ <b>Имя:</b> ${name}
▫️ <b>Телефон:</b> ${phone}
${service ? `▫️ <b>Услуга:</b> ${service}\n` : ''}
${message ? `▫️ <b>Сообщение:</b>\n${message}\n` : ''}
⏱ <i>${new Date().toLocaleString()}</i>
    `;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || 'Telegram API error');
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
