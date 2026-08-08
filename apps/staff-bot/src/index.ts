import { Markup, Telegraf } from "telegraf";

const token = process.env.BOT_TOKEN_STAFF;

if (!token) {
  console.error("Missing BOT_TOKEN_STAFF. Set BOT_TOKEN_STAFF before starting the staff bot.");
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  return ctx.reply(
    "👋 Welcome to Wing⚡Boss Staff Bot!",
    Markup.inlineKeyboard([Markup.button.callback("Queue", "queue")])
  );
});

bot.action("queue", (ctx) => {
  return ctx.answerCbQuery("Queue stub").then(() => ctx.reply("📋 Queue feature stub"));
});

bot.launch();
console.log("Staff bot started with long polling ✅");
