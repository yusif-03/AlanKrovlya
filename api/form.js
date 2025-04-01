
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, service, message } = req.body;

  const token = '7958576790:AAG5ldEUA5l2_h7dKlm1maM1eXtaSLW9MLE';
  const chat_id = '8042773428';

  const text = `
🚨 Новая заявка с сайта:
👤 Имя: ${name}
📞 Телефон: ${phone}
🛠️ Услуга: ${service}
📝 Комментарий: ${message || '–'}
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
