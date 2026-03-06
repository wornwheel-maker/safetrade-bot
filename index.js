const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server started on port " + port);
});

const token = process.env.BOT_TOKEN;

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
            web_app: { url: "https://ТВОЙ-ДОМЕН.railway.app" }
          }
        ]
      ]
    }
  });
});

app.listen(port, () => {
  console.log("Server started");
});
