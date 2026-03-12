const express = require("express")
const TelegramBot = require("node-telegram-bot-api")

const app = express()
const port = process.env.PORT || 8080

const token = "8663683179:AAHoW_TvnDxGELWlo4RvcQvVhIwdMAKdqWM"

const bot = new TelegramBot(token)

app.use(express.json())
app.use(express.static("public"))

const URL = "https://safetrade-bot-production.up.railway.app"

bot.setWebHook(`${URL}/bot${token}`)

app.post(`/bot${token}`, (req,res)=>{
    bot.processUpdate(req.body)
    res.sendStatus(200)
})

bot.onText(/\/start/, (msg)=>{
    bot.sendMessage(msg.chat.id,"🚀 SafeTrade Marketplace",{
        reply_markup:{
            inline_keyboard:[
                [
                    {
                        text:"🚀 Открыть SafeTrade",
                        web_app:{ url: URL }
                    }
                ]
            ]
        }
    })
})

/* ============================= */
/* MARKET API */
/* ============================= */

const prices = {
 "Heart Locket": 12,
 "Plush Pepe": 7,
 "Diamond Ring": 20,
 "Crystal Ball": 15,
 "Astral Shard": 18,
 "Jelly Bunny": 5,
 "Magic Potion": 9,
 "Top Hat": 11
}

app.get("/api/prices",(req,res)=>{
    res.json(prices)
})

/* ============================= */
/* TRADE HISTORY */
/* ============================= */

let trades = []

app.get("/api/trades",(req,res)=>{
    res.json(trades)
})

app.post("/api/trade",(req,res)=>{

 const trade = {
  user:req.body.user,
  gift:req.body.gift,
  price:req.body.price,
  date:new Date()
 }

 trades.push(trade)

 res.json({status:"ok"})
})

app.listen(port,()=>{
 console.log("Server started on port "+port)
})
