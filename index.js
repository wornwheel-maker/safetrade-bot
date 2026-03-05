const TelegramBot = require('8663683179:AAEETa3tYsbhhxIq-jB_IEoEggC3v8NUNZc');

const token = "PASTE_YOUR_BOT_TOKEN_HERE";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 SafeTrade Bot запущен!");
});
