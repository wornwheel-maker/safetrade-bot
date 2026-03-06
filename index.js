const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;

// Токен бота (можно пока вставить прямо)
const token = "8663683179:AAHoW_TvnDxGELWlo4RvcQvVhIwdMAKdqWM";

const bot = new TelegramBot(token, { polling: true });

// отдаём все файлы из папки public
app.use(express.static("public"));

// открываем index.html из public
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// обработчик /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 Добро пожаловать в SafeTrade!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Открыть SafeTrade",
            web_app: { url: "https://safetrade-bot-production.up.railway.app" } // обязательно с https://
          }
        ]
      ]
    }
  });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
