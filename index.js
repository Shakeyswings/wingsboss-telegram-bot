import { Telegraf } from "telegraf";
import fs from "fs";

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("BOT_TOKEN is missing");

const bot = new Telegraf(BOT_TOKEN);

function loadMenu() {
  const raw = fs.readFileSync("./data/menu.json", "utf8");
  return JSON.parse(raw);
}

bot.start((ctx) => {
  ctx.reply("🍗 WingsBoss bot is alive. Type /menu");
});

bot.command("menu", (ctx) => {
  const menu = loadMenu();
  const lines = [];

  for (const cat of menu.categories || []) {
    lines.push(`\n${cat.name}`);
    for (const item of cat.items || []) {
      lines.push(`- ${item.name} — $${item.price}`);
    }
  }

  ctx.reply(lines.join("\n").trim() || "Menu is empty.");
});

bot.on("text", (ctx) => {
  ctx.reply("Got it 👍  Type /menu");
});

bot.launch();
console.log("WingsBoss Telegram bot started");
