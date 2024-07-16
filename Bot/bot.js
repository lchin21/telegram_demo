const { Telegraf } = require('telegraf')
const TOKEN = '7389090595:AAEWs8ZNsT_cjboa8RJMEHBUE6sFYXSs7iE'
const bot = new Telegraf(TOKEN)

const web_link = "https://telegram-app-for-reddio.vercel.app/"

bot.start((ctx) => ctx.reply('Welcome', {reply_markup:{keyboard:[[{text:"web app", web_app: { url: web_link} }]]},
})
)

bot.launch()
