const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, phone, roofType, roofArea, roofComplexity } = req.body;

    const message = `
      Новый запрос:
      Имя: ${name}
      Телефон: ${phone}
      Тип кровли: ${roofType}
      Площадь кровли: ${roofArea}
      Сложность кровли: ${roofComplexity}
    `;

    const telegramToken = '7598218261:AAGFAcVAEHuCq5lXHEKFTzpfgyFjMVWS5G0';  // Заменить на токен бота
    const chatId = '7373169686';  // Заменить на ID чата

    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    try {
      await fetch(telegramUrl, {
        method: 'POST',
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      res.status(200).json({ message: 'Data sent to Telegram' });
    } catch (error) {
      console.error('Error sending data to Telegram:', error);
      res.status(500).json({ message: 'Error sending data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
