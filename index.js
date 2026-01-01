import { Telegraf } from "telegraf";
import fs from "fs";

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is missing. Set it in your host env vars.");
}

const bot = new Telegraf(BOT_TOKEN);

function loadMenu() {
  const raw = fs.readFileSync("./data/menu.json", "utf8");
  const menu = JSON.parse(raw);

  if (!menu || !Array.isArray(menu.categories)) {
    throw new Error("menu.json invalid: expected { categories: [...] }");
  }

  return menu;
}

function formatUSD(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "";
  return `$${num.toFixed(2)}`;
}

function menuToText(menu) {
  let out = "📋 *Menu*\n\n";
  for (const cat of menu.categories) {
    out += `*${cat.name}*\n`;
    for (const item of cat.items || []) {
      const price = item.price_usd != null ? ` — ${formatUSD(item.price_usd)}` : "";
      out += `• ${item.name}${price}\n`;
    }
    out += "\n";
  }
  out += "_Reply with /menu anytime to view this list._";
  return out;
}

bot.start((ctx) => {
  ctx.reply("🍗 WingsBoss bot is alive.\nType /menu to view the menu.");
});

bot.command("menu", (ctx) => {
  try {
    const menu = loadMenu();
    const text = menuToText(menu);
    ctx.replyWithMarkdown(text);
  } catch (err) {
    ctx.reply(`❌ Menu load failed: ${err.message}`);
  }
});

bot.on("text", (ctx) => {
  ctx.reply("Type /menu to see the menu.");
});

bot.launch();
console.log("WingsBoss Telegram bot started ✅");
