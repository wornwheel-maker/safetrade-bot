const TelegramBot = require('node-telegram-bot-api');

const token = "PASTE_YOUR_BOT_TOKEN_HERE";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 SafeTrade Bot запущен!");
});
