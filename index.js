const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;

const token = "8663683179:AAHoW_TvnDxGELWlo4RvcQvVhIwdMAKdqWM";
const bot = new TelegramBot(token, { polling: true });

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("SafeTrade работает 🚀");
});

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 SafeTrade", {
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

// создание трейда
app.post("/create-trade", async (req, res) => {
  const { partner, gift, price, fromUser } = req.body;

  try {
    await bot.sendMessage(partner, `
📦 Trade Offer

👤 From: @${fromUser}

🎁 Gift: ${gift}
💰 Price: ${price} TON
    `, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✅ Accept", callback_data: "accept_trade" },
            { text: "❌ Decline", callback_data: "decline_trade" }
          ]
        ]
      }
    });

    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
});

// кнопки
bot.on("callback_query", (query) => {
  if (query.data === "accept_trade") {
    bot.sendMessage(query.message.chat.id, "✅ Сделка принята");
  }

  if (query.data === "decline_trade") {
    bot.sendMessage(query.message.chat.id, "❌ Сделка отклонена");
  }
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
