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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      GoblinFactory.from(item).updateQuality();
    }
    return this.items;
  }
}

class GoblinItem {
  item: Item;

  constructor(item) {
    this.item = item;
  }

  updateQuality() {
    this.decreaseSellIn();
    this.decreaseQuality(); // the default
  }

  decreaseSellIn() {
    this.item.sellIn--;
  }

  decreaseQuality(q: number = 1) {
    const n = this.item.sellIn < 0? q * 2 : q;
    this.item.quality = Math.max(0, this.item.quality - n);
  }

  increaseQuality(q: number = 1) {
    const n = this.item.sellIn < 0? q * 2 : q;
    this.item.quality = Math.min(50, this.item.quality + n);
  }
}

class AgedBrieItem extends GoblinItem {
  updateQuality() {
    this.decreaseSellIn();
    this.increaseQuality();
  }
}

class SulfurasItem extends GoblinItem {
  updateQuality() {}
}

class BackstagePassesItem extends GoblinItem {
  updateQuality() {
    this.decreaseSellIn();
    if (this.item.sellIn < 0) {
      this.item.quality = 0;
    }
    else {
      this.increaseQuality(this.item.sellIn < 5? 3 : this.item.sellIn < 10? 2 : 1);
    }
  }
}

class ConjuredItem extends GoblinItem {
  updateQuality() {
    this.decreaseSellIn();
    this.decreaseQuality(2);
  }
}

class GoblinFactory {
  static from(item: Item) {
    switch (item.name) {
      case 'Aged Brie': return new AgedBrieItem(item);
      case 'Sulfuras, Hand of Ragnaros': return new SulfurasItem(item);
      case 'Backstage passes to a TAFKAL80ETC concert': return new BackstagePassesItem(item);
      case 'Conjured Mana Cake': return new ConjuredItem(item);
      default: return new GoblinItem(item);
    }
  }
}