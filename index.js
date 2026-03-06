const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;

// Токен бота
const token = "8663683179:AAHoW_TvnDxGELWlo4RvcQvVhIwdMAKdqWM";

// Бот через webhook
const bot = new TelegramBot(token, { webHook: true });

// Разрешаем получать JSON
app.use(express.json());

// Отдаём MiniApp из папки public
app.use(express.static("public"));

// Главная страница
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Webhook маршрут
app.post(`/bot${token}`, (req, res) => {
  console.log("Получено обновление:", JSON.stringify(req.body, null, 2));
  bot.processUpdate(req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error("Ошибка processUpdate:", err);
      res.sendStatus(200);
    });
});

// /start обработчик
bot.onText(/\/start/, (msg) => {
  console.log("/start от:", msg.chat.id);
  bot.sendMessage(msg.chat.id, "🚀 Добро пожаловать в SafeTrade!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Открыть SafeTrade",
            web_app: { url: "https://safetrade-bot-production.up.railway.app/?v=2" }
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
app.listen(port, () => console.log("Server started on port " + port));
