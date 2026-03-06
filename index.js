const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;

// Токен бота
const token = "8663683179:AAHoW_TvnDxGELWlo4RvcQvVhIwdMAKdqWM";

// Бот только через webhook
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
  // Логируем все входящие обновления для отладки
  console.log("Получено обновление:", JSON.stringify(req.body, null, 2));

  bot.processUpdate(req.body)
    .then(() => res.sendStatus(200)) // Telegram обязательно ждёт 200
    .catch((err) => {
      console.error("Ошибка processUpdate:", err);
      res.sendStatus(200); // чтобы Telegram не считала webhook сломанным
    });
});

// /start обработчик
bot.onText(/\/start/, (msg) => {
  console.log("/start от:", msg.chat.id); // логируем кто нажал
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

// Устанавливаем webhook на URL с токеном
bot.setWebHook(`https://safetrade-bot-production.up.railway.app/bot${token}`)
  .then(() => console.log("Webhook установлен"))
  .catch(console.error);

// Запуск сервера
app.listen(port, () => console.log("Server started on port " + port));
