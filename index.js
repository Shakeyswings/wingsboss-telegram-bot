import { Telegraf } from "telegraf";
import fs from "fs";

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is missing");
}

const bot = new Telegraf(BOT_TOKEN);

// Load menu data
const menu = JSON.parse(fs.readFileSync("./data/menu.json", "utf8"));

bot.start((ctx) => {
  let message = "🍗 *WingsBoss Menu*\n\n";

  menu.categories.forEach((category) => {
    message += `*${category.name}*\n`;
    category.items.forEach((item) => {
      message += `• ${item.name} — $${item.price_usd}\n`;
    });
    message += "\n";
  });

  ctx.reply(message, { parse_mode: "Markdown" });
});

bot.launch();

console.log("✅ WingsBoss Telegram bot is running");
