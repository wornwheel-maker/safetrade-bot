const TelegramBot = require('node-telegram-bot-api');

const token = '8663683179:AAEETa3tYsbhhxIq-jB_IEoEggC3v8NUNZc'; // Токен только здесь

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {

  const chatId = msg.chat.id;

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Открыть SafeTrade",
            web_app: { url: "https://example.com" }
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, "Добро пожаловать в SafeTrade!", keyboard);
});
