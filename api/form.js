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
    console.log('Sending to Telegram:', telegramMessage); // Для отладки

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
      const errorResponse = await telegramResponse.json();  // Получим информацию об ошибке
      console.error('Telegram API error:', errorResponse);
      res.status(500).json({ error: "Не удалось отправить сообщение в Telegram", details: errorResponse });
    }
  } catch (error) {
    console.error("Ошибка при отправке данных в Telegram:", error);
    res.status(500).json({ error: "Ошибка сервера", details: error.message });
  }
});
