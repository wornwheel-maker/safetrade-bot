const express = require("express")
const fs = require("fs")
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

bot.sendMessage(msg.chat.id,"🚀 SafeTrade",{
reply_markup:{
inline_keyboard:[
[
{
text:"Open SafeTrade",
web_app:{url:URL}
}
]
]
}
})

})

/* DATABASE */

function readDB(){

return JSON.parse(
fs.readFileSync("./database/db.json")
)

}

function writeDB(data){

fs.writeFileSync(
"./database/db.json",
JSON.stringify(data,null,2)
)

}

/* PRICES */

app.get("/api/prices",(req,res)=>{

const db = readDB()

res.json(db.prices)

})

/* INVENTORY */

app.get("/api/inventory/:user",(req,res)=>{

const db = readDB()

const items = db.inventory.filter(
i => i.user == req.params.user
)

res.json(items)

})

/* CREATE TRADE */

app.post("/api/trade",(req,res)=>{

const db = readDB()

const trade = {

id:Date.now(),

seller:req.body.seller,

buyer:req.body.buyer,

gift:req.body.gift,

price:req.body.price,

status:"pending"

}

db.trades.push(trade)

writeDB(db)

res.json(trade)

})

/* TRADE HISTORY */

app.get("/api/trades",(req,res)=>{

const db = readDB()

res.json(db.trades)

})

app.listen(port,()=>{

console.log("SafeTrade server started")

})
