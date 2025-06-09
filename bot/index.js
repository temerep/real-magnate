import TelegramBot from "node-telegram-bot-api"
const TOKEN = "7921515257:AAHZU-A5ftvpj3c2sYBp93p-34INN3xKFHs";
const bot = new TelegramBot(TOKEN, { polling: true });
const port = process.env.PORT || 9898;
const queries = {};


bot.onText(/\/start(.*)/, (msg, match) => {
  bot.sendMessage(msg.chat.id, "Добро пожаловать в RealMAGNATE", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть веб-приложение",
            web_app: { url: "https://ps4g31hm-55313.euw.devtunnels.ms/" },
          },
        ],
      ],
    },
  });
});

