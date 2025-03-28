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

  updateQualityLegacy() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
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

class GoblinFactory {
  static from(item: Item) {
    switch (item.name) {
      case 'Aged Brie': return new AgedBrieItem(item);
      case 'Sulfuras, Hand of Ragnaros': return new SulfurasItem(item);
      case 'Backstage passes to a TAFKAL80ETC concert': return new BackstagePassesItem(item);
      default: return new GoblinItem(item);
    }
  }
}
