const TelegramBot = require('node-telegram-bot-api'); // Первая строка должна быть именно такой!

const token = '8663683179:AAEETa3tYsbhhxIq-jB_IEoEggC3v8NUNZc'; // Токен только здесь

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 SafeTrade Bot работает!");
});

console.log("Бот запущен...");
