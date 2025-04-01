const fetch = require('node-fetch');

export default async function handler(req, res) {
    console.log("Request received:", req.method);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, phone, service, message } = req.body || {};

    if (!name || !phone || !service) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const TOKEN = '7598218261:AAGFAcVAEHuCq5lXHEKFTzpfgyFjMVWS5G0';
    const CHAT_ID = '7373169686';

    const text = `
📞 New Callback Request:
👤 Name: ${name}
📱 Phone: ${phone}
🕒 Best Time to Call: ${service}
📩 Message: ${message || '-'}
`;

    try {
        console.log("Sending request to Telegram...");

        const telegramURL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        const response = await fetch(telegramURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Telegram error:", error);
            return res.status(500).json({ error: 'Telegram error', details: error });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ error: 'Request failed', details: error.message });
    }
}
