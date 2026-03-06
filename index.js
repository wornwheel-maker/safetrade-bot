const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 8080;

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
  try {
    bot.processUpdate(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.error("Ошибка processUpdate:", err);
        res.sendStatus(200); // обязательно 200, чтобы Telegram не выдавал ошибки
      });
  } catch (err) {
    console.error("Webhook упал:", err);
    res.sendStatus(200); // даже если try/catch сработал, возвращаем 200
  }
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
            web_app: { url: "https://safetrade-bot-production.up.railway.app/?v=100" }
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
