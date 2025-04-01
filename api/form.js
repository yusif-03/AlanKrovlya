const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// Токен бота и ID чата
const TELEGRAM_BOT_TOKEN = '7598218261:AAGFAcVAEHuCq5lXHEKFTzpfgyFjMVWS5G0';
const CHAT_ID = '7373169686';

// Обработчик POST-запросов
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

    // Проверка успешной отправки
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

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
