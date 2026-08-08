import { Markup, Telegraf } from "telegraf";

const token = process.env.BOT_TOKEN_CUSTOMER;

if (!token) {
  console.error("Missing BOT_TOKEN_CUSTOMER. Set BOT_TOKEN_CUSTOMER before starting the customer bot.");
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  return ctx.reply(
    "👋 Welcome to Wing⚡Boss Customer Bot!",
    Markup.inlineKeyboard([Markup.button.callback("Ping", "ping")])
  );
});

bot.action("ping", (ctx) => {
  return ctx.answerCbQuery("Pong").then(() => ctx.reply("🏓 Pong"));
});

bot.launch();
console.log("Customer bot started with long polling ✅");
