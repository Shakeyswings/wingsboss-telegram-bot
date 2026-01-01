const fs = require("fs");
const path = require("path");
const { Telegraf, Markup } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
const STAFF_CHAT_ID = process.env.STAFF_CHAT_ID;

if (!BOT_TOKEN) throw new Error("BOT_TOKEN missing");
if (!STAFF_CHAT_ID) throw new Error("STAFF_CHAT_ID missing");

const MENU_PATH = path.join(__dirname, "data", "menu.json");

function loadMenu() {
  const raw = fs.readFileSync(MENU_PATH, "utf8");
  return JSON.parse(raw);
}

const bot = new Telegraf(BOT_TOKEN);
const carts = new Map();

function getCart(userId) {
  if (!carts.has(userId)) carts.set(userId, []);
  return carts.get(userId);
}

bot.start(ctx => {
  ctx.reply(
    "🍗 Shakey’s Chicken Wings",
    Markup.keyboard([["🍗 MENU", "🛒 CART"]]).resize()
  );
});

bot.hears("🍗 MENU", ctx => {
  const menu = loadMenu();
  const buttons = menu.categories.map((c, i) => [
    Markup.button.callback(c.name, `CAT_${i}`)
  ]);
  ctx.reply("Choose a category:", Markup.inlineKeyboard(buttons));
});

bot.action(/CAT_(\d+)/, ctx => {
  const menu = loadMenu();
  const cat = menu.categories[Number(ctx.match[1])];
  const buttons = cat.items.map((item, i) => [
    Markup.button.callback(
      `${item.name} — $${item.price_usd}`,
      `ADD_${ctx.match[1]}_${i}`
    )
  ]);
  ctx.editMessageText(cat.name, Markup.inlineKeyboard(buttons));
});

bot.action(/ADD_(\d+)_(\d+)/, ctx => {
  const menu = loadMenu();
  const item =
    menu.categories[Number(ctx.match[1])].items[Number(ctx.match[2])];
  getCart(ctx.from.id).push(item);
  ctx.answerCbQuery("Added");
});

bot.hears("🛒 CART", ctx => {
  const cart = getCart(ctx.from.id);
  if (!cart.length) return ctx.reply("Cart is empty.");

  const lines = cart.map(i => `• ${i.name} — $${i.price_usd}`);
  const total = cart.reduce((s, i) => s + i.price_usd, 0);

  ctx.reply(
    `${lines.join("\n")}\n\nTotal: $${total}`,
    Markup.inlineKeyboard([
      [Markup.button.callback("PLACE ORDER", "PLACE_ORDER")],
      [Markup.button.callback("CLEAR", "CLEAR_CART")]
    ])
  );
});

bot.action("CLEAR_CART", ctx => {
  carts.set(ctx.from.id, []);
  ctx.editMessageText("Cart cleared.");
});

bot.action("PLACE_ORDER", ctx => {
  const cart = getCart(ctx.from.id);
  if (!cart.length) return;

  const lines = cart.map(i => `• ${i.name} — $${i.price_usd}`);
  const total = cart.reduce((s, i) => s + i.price_usd, 0);

  ctx.telegram.sendMessage(
    STAFF_CHAT_ID,
    `🧾 NEW ORDER\n${lines.join("\n")}\n\nTotal: $${total}`
  );

  carts.set(ctx.from.id, []);
  ctx.editMessageText("Order sent.");
});

bot.launch();
console.log("Bot running");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
