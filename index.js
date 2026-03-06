const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;

/*
ВСТАВЬ СЮДА СВОЙ ТОКЕН ОТ БОТА
Например:
const token = "123456789:AAExampleExampleExample";
*/
const token = "8663683179:AAHoW_TvnDxGELWlo4RvcQvVhIwdMAKdqWM";

const bot = new TelegramBot(token, { polling: true });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 Добро пожаловать в SafeTrade!", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Открыть SafeTrade",
            web_app: { url: "safetrade-bot-production.up.railway.app" }
          }
        ]
      ]
    }
  });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
