// api/form.js
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN || '7598218261:AAGFAcVAEHuCq5lXHEKFTzpfgyFjMVWS5G0';
  const CHAT_ID = process.env.CHAT_ID || '7373169686';

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || 'Telegram API error');
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    res.status(500).json({ error: error.message });
  }
};
