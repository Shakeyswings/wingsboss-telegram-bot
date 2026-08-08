export interface MenuOption {
  label: string;
  price: number;
}

export interface MenuItem {
  code: string;
  name: string;
  description?: string;
  options: MenuOption[];
}

export interface MenuCatalog {
  currency: "USD";
  items: MenuItem[];
  flavors: {
    sauces: string[];
    dryRubs: string[];
    drizzles: MenuItem[];
  };
  drinks: string[];
  dips: string[];
  extras: MenuItem[];
}

export const menu: MenuCatalog = {
  currency: "USD",
  items: [
    {
      code: "A1",
      name: "Bone-In Combo",
      description: "Wings, fries, and dip",
      options: [
        { label: "6 pc", price: 10.95 },
        { label: "10 pc", price: 14.95 }
      ]
    },
    {
      code: "A2",
      name: "Boneless Combo",
      description: "Boneless wings, fries, and dip",
      options: [
        { label: "8 pc", price: 13.95 },
        { label: "12 pc", price: 17.95 }
      ]
    },
    {
      code: "A3",
      name: "Flavor Box",
      description: "8 wings, XXL fries, dry rub, drizzle, and dip",
      options: [
        { label: "Bone-in", price: 14.95 },
        { label: "Boneless", price: 16.45 }
      ]
    },
    {
      code: "A4",
      name: "Wings",
      description: "12 wings include 2 flavors; 35 wings include 3 flavors",
      options: [
        { label: "6 pc", price: 6.75 },
        { label: "12 pc", price: 12.95 },
        { label: "20 pc", price: 20.75 },
        { label: "35 pc", price: 35.95 },
        { label: "50 pc", price: 49.95 }
      ]
    },
    {
      code: "A5",
      name: "Boneless Wings",
      description: "12 wings include 2 flavors",
      options: [
        { label: "8 pc", price: 9.5 },
        { label: "12 pc", price: 13.95 },
        { label: "24 pc", price: 26.5 },
        { label: "48 pc", price: 51.95 }
      ]
    },
    { code: "B1", name: "Single Burger", options: [{ label: "Each", price: 4 }] },
    { code: "B2", name: "Double Burger", options: [{ label: "Each", price: 7 }] },
    { code: "B3", name: "Western BBQ Burger", options: [{ label: "Each", price: 9 }] },
    { code: "B4", name: "Sauce Boss Burger", options: [{ label: "Each", price: 9 }] },
    { code: "C1", name: "Fried Corn", options: [{ label: "Each", price: 4 }] },
    { code: "C2", name: "Cajun Fries", options: [{ label: "Each", price: 4 }] },
    { code: "C3", name: "Onion Rings", options: [{ label: "Each", price: 5 }] },
    { code: "C4", name: "Garlic Fries", options: [{ label: "Each", price: 5 }] },
    {
      code: "C5",
      name: "Sides Sampler",
      description: "All 4 sides and dip",
      options: [{ label: "Sampler", price: 13 }]
    }
  ],
  flavors: {
    sauces: ["Fire Storm", "Jerk", "Buffalo", "Texas BBQ", "Korean", "Honey Teriyaki", "Spicy Peanut"],
    dryRubs: ["Cajun", "Midnight Rub", "Buffalo Dust", "Kampot Pepper Hot Honey", "Lemon Pepper", "Garlic Parm"],
    drizzles: [
      { code: "D1", name: "Ranch", options: [{ label: "Add", price: 0.5 }] },
      { code: "D2", name: "Fireback", options: [{ label: "Add", price: 0.5 }] },
      { code: "D3", name: "Hot Honey", options: [{ label: "Add", price: 0.5 }] },
      { code: "D4", name: "Triple Driz", options: [{ label: "Add", price: 1 }] }
    ]
  },
  drinks: ["Coke", "Pepsi", "Sting", "Sprite", "Schweppes"],
  dips: ["Ranch", "Fireback", "Ketchup", "BBQ"],
  extras: [
    { code: "EX-SAUCE", name: "Extra Sauce or Rub", options: [{ label: "Add", price: 1 }] },
    { code: "EX-PATTY", name: "Beef Patty", options: [{ label: "Add", price: 2.25 }] },
    { code: "EX-CHEESE", name: "Cheese", options: [{ label: "Add", price: 0.75 }] },
    { code: "EX-WINGS", name: "2 Wings", options: [{ label: "Add", price: 2.5 }] },
    { code: "SP-MILD", name: "Mild Spice", options: [{ label: "Add", price: 0.25 }] },
    { code: "SP-HOT", name: "Hot Spice", options: [{ label: "Add", price: 0.5 }] },
    { code: "SP-SPICY", name: "Spicy", options: [{ label: "Add", price: 0.75 }] },
    { code: "SP-EXTREME", name: "Extreme", options: [{ label: "Add", price: 1 }] },
    { code: "SP-NUCLEAR", name: "Nuclear", options: [{ label: "Add", price: 1.25 }] },
    { code: "DRINK", name: "Drink", options: [{ label: "Add", price: 1.25 }] },
    { code: "DIP", name: "Dip", options: [{ label: "Add", price: 0.75 }] },
    { code: "CARROTS", name: "Carrots", options: [{ label: "Add", price: 0.75 }] },
    { code: "GLOVES", name: "Gloves", options: [{ label: "Add", price: 0.5 }] }
  ]
};

const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

export const formatMenu = (catalog: MenuCatalog = menu): string => {
  const lines = ["🍗 Wing⚡Boss Menu", ""];

  for (const item of catalog.items) {
    const prices = item.options.map(({ label, price }) => `${label} ${formatPrice(price)}`).join(" · ");
    lines.push(`${item.code} ${item.name}: ${prices}`);
  }

  lines.push("", "🔥 Sauces: " + catalog.flavors.sauces.join(", "));
  lines.push("🧂 Dry rubs: " + catalog.flavors.dryRubs.join(", "));
  lines.push("💧 Drizzles: " + catalog.flavors.drizzles.map(({ code, name, options }) => `${code} ${name} ${formatPrice(options[0].price)}`).join(" · "));
  lines.push("🥤 Drinks (+$1.25): " + catalog.drinks.join(", "));
  lines.push("🥣 Dips (+$0.75): " + catalog.dips.join(", "));
  lines.push("", "Extras and spice upgrades are available. Ask staff for current availability.");

  return lines.join("\n");
};
