const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;

// ⚠️ ВАЖНО: вставь сюда свой токен
const token = "8663683179:AAHoW_TvnDxGELWlo4RvcQvVhIwdMAKdqWM";

// 🚀 используем polling (НЕ webhook!)
const bot = new TelegramBot(token, { polling: true });

// раздаём Mini App
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("SafeTrade работает 🚀");
});

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 SafeTrade запущен!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть SafeTrade",
            web_app: {
              url: "https://safetrade-bot-production.up.railway.app"
            }
          }
        ]
      ]
    }
  });
});

// запуск сервера
app.listen(port, () => {
  console.log("Server started on port " + port);
});
