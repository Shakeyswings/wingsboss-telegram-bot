const fs = require("fs");
const path = require("path");
const { Telegraf, Markup } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("BOT_TOKEN is missing (set it in Railway Variables).");

const bot = new Telegraf(BOT_TOKEN);

// ---- Load menu.json ----
function loadMenu() {
  const p = path.join(__dirname, "data", "menu.json");
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

function listCategories(menu) {
  return menu.categories?.map((c) => c.name) || [];
}

function getCategory(menu, name) {
  return (menu.categories || []).find((c) => c.name === name);
}

function formatItems(items) {
  if (!items?.length) return "No items found.";
  return items
    .map((i) => {
      const price = i.price != null ? ` — $${i.price}` : "";
      return `• ${i.name}${price}`;
    })
    .join("\n");
}

// ---- Commands ----
bot.start(async (ctx) => {
  const menu = loadMenu();
  const cats = listCategories(menu);

  const buttons = cats.map((c) => [Markup.button.callback(c, `CAT:${c}`)]);
  await ctx.reply(
    "🍗 WingsBoss bot is alive.\nPick a category:",
    Markup.inlineKeyboard(buttons)
  );
});

bot.command("menu", async (ctx) => {
  const menu = loadMenu();
  const cats = listCategories(menu);
  if (!cats.length) return ctx.reply("No categories in menu.json yet.");

  const buttons = cats.map((c) => [Markup.button.callback(c, `CAT:${c}`)]);
  return ctx.reply("Pick a category:", Markup.inlineKeyboard(buttons));
});

// ---- Button handler ----
bot.on("callback_query", async (ctx) => {
  try {
    const data = ctx.callbackQuery.data || "";
    if (!data.startsWith("CAT:")) return ctx.answerCbQuery();

    const catName = data.replace("CAT:", "");
    const menu = loadMenu();
    const cat = getCategory(menu, catName);

    if (!cat) {
      await ctx.answerCbQuery("Category not found.");
      return;
    }

    const text = `**${cat.name}**\n\n${formatItems(cat.items)}`;
    await ctx.editMessageText(text, { parse_mode: "Markdown" });
    await ctx.answerCbQuery();
  } catch (e) {
    console.error(e);
    try { await ctx.answerCbQuery("Error."); } catch {}
  }
});

// ---- Launch ----
bot.launch();
console.log("WingsBoss Telegram bot started.");

// Enable graceful stop on Railway restarts
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
