export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const itemNames = {
  AgedBrie: "Aged Brie",
  Sulfuras: "Sulfuras",
  Foo: "foo",
  Conjured: "Conjured",
  ConjuredFoo: "Conjured foo",
  ConjuredCake: "Conjured Mana Cake",
  SulfurasLegendary: "Sulfuras, Hand of Ragnaros",
  Backstage: "Backstage passes",
};

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name.includes(itemNames.Sulfuras)) {
        continue;
      }
      this.items[i].sellIn--;
      if (this.items[i].name === itemNames.AgedBrie) {
        if (this.items[i].quality < 50) this.items[i].quality++;
        continue;
      }
      if (this.items[i].name.includes(itemNames.Backstage)) {
        if (this.items[i].sellIn < 0) {
          this.items[i].quality = 0;
          continue;
        }
        this.items[i].quality = this.items[i].quality + 1;
        if (this.items[i].sellIn < 11) {
          this.items[i].quality = this.items[i].quality + 1;
        }
        if (this.items[i].sellIn < 6) {
          this.items[i].quality = this.items[i].quality + 1;
        }
        if (this.items[i].quality > 50) {
          this.items[i].quality = 50;
        }
        continue;
      }
      const decrease = this.items[i].name.includes(itemNames.Conjured) ? 1 : 0;
      this.items[i].quality = this.items[i].quality - 1 - decrease;
      if (this.items[i].sellIn < 0) {
        this.items[i].quality = this.items[i].quality - 1 - decrease;
      }
      if (this.items[i].quality < 0) {
        this.items[i].quality = 0;
      }
    }

    return this.items;
  }
}
