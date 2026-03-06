const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;

// Твой токен бота
const token = "8663683179:AAHoW_TvnDxGELWlo4RvcQvVhIwdMAKdqWM";

const bot = new TelegramBot(token);

// Разрешаем серверу обрабатывать JSON (Telegram присылает POST с JSON)
app.use(express.json());

// Отдаём все файлы из папки public
app.use(express.static("public"));

// Главная страница — index.html из public
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Webhook маршрут, куда Telegram будет присылать обновления
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body); // передаем обновление боту
  res.sendStatus(200);
});

// Команда /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 Добро пожаловать в SafeTrade!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Открыть SafeTrade",
            web_app: { url: "https://safetrade-bot-production.up.railway.app" }
          }
        ]
      ]
    }
  });
});

// Устанавливаем webhook
bot.setWebHook(`https://safetrade-bot-production.up.railway.app/bot${token}`)
  .then(() => console.log("Webhook установлен"))
  .catch(console.error);

// Запуск сервера
app.listen(port, () => {
  console.log("Server started on port " + port);
});
