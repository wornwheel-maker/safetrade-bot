const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

const token = "8663683179:AAHoW_TvnDxGELWlo4RvcQvVhIwdMAKdqWM";

// ❌ УБРАЛИ polling
const bot = new TelegramBot(token);

app.use(express.json());
app.use(express.static("public"));

// URL твоего проекта
const URL = "https://safetrade-bot-production.up.railway.app";

// webhook
bot.setWebHook(`${URL}/bot${token}`);

// Telegram будет слать сюда обновления
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// 📦 база
const DB_FILE = "users.json";
let users = {};

if (fs.existsSync(DB_FILE)) {
  users = JSON.parse(fs.readFileSync(DB_FILE));
}

function saveUsers() {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}

// START
bot.onText(/\/start/, (msg) => {
  const username = msg.from.username;

  if (!username) {
    return bot.sendMessage(msg.chat.id, "У тебя нет username ❌");
  }

  users[username.toLowerCase()] = msg.chat.id;
  saveUsers();

  console.log("Сохранили:", username, msg.chat.id);

  bot.sendMessage(msg.chat.id, "🚀 SafeTrade", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть SafeTrade",
            web_app: {
              url: URL
            }
          }
        ]
      ]
    }
  });
});

// CREATE TRADE
app.post("/create-trade", async (req, res) => {
  let { partner, gift, price, fromUser } = req.body;

  partner = partner.replace("@", "").toLowerCase();

  const chatId = users[partner];

  if (!chatId) {
    return res.send({ success: false });
  }

  try {
    await bot.sendMessage(chatId, `
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
