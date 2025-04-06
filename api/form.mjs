export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => resolve(data));
      req.on("error", (err) => reject(err));
    });

    const { name, phone, service, message, time, source } = JSON.parse(body);

    if (!name || !phone) return res.status(400).json({ error: "Name and phone are required" });

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) throw new Error("Telegram credentials not found");

    let telegramMessage = `📢 <b>Новая заявка с сайта</b>\n\n`;

    if (source === "callback") {
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

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || "Telegram API error");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Ошибка обработки формы:", error);
    res.status(500).json({ error: error.message });
  }
}
