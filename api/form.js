export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, service, message } = req.body;

  const token = '7598218261:AAGFAcVAEHuCq5lXHEKFTzpfgyFjMVWS5G0';
  const chat_id = '7373169686';

  const text = `
📥 Новая заявка с сайта:
👤 Имя: ${name}
📞 Телефон: ${phone}
🛠 Услуга: ${service}
📩 Комментарий: ${message || '-'}
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
const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// Your Telegram Bot API Token and Chat ID
const TELEGRAM_BOT_TOKEN = '7598218261:AAGFAcVAEHuCq5lXHEKFTzpfgyFjMVWS5G0';
const CHAT_ID = '7373169686';

app.post("/api/form", async (req, res) => {
  const { name, phone, service, message, roofType, roofArea, roofComplexity, type } = req.body;

  let telegramMessage = '';
  
  if (type === 'Консультация') {
    telegramMessage = `
      Новый запрос на консультацию:
      Имя: ${name}
      Телефон: ${phone}
      Тип кровли: ${service}
      Сообщение: ${message}
    `;
  } else if (type === 'Запрос на расчет стоимости') {
    telegramMessage = `
      Новый запрос на расчет стоимости:
      Имя: ${name}
      Телефон: ${phone}
      Тип кровли: ${roofType}
      Площадь кровли: ${roofArea} м²
      Сложность кровли: ${roofComplexity}
    `;
  }

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage
      })
    });

    if (telegramResponse.ok) {
      res.status(200).json({ message: "Заявка успешно отправлена в Telegram" });
    } else {
      res.status(500).json({ error: "Не удалось отправить сообщение в Telegram" });
    }
  } catch (error) {
    console.error("Ошибка при отправке данных в Telegram:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
