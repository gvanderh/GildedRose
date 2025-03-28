import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should decrease the quality and sellIn', () => {
    const gr = new GildedRose([new Item('foo', 2, 1)]);
    const item = gr.updateQuality()[0];
    expect(item.sellIn).toBe(1);
    expect(item.quality).toBe(0);
  });

  it('should decrease the quality twice as fast when sellIn <= 0', () => {
    const gr = new GildedRose([new Item('foo', 0, 2)]);
    const item = gr.updateQuality()[0];
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });

  it('should not allow a negative quality', () => {
    const gr = new GildedRose([new Item('foo', 0, 0)]);
    const item = gr.updateQuality()[0];
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });

  it('should increase the quality for "Aged Brie"', () => {
    const gr = new GildedRose([new Item('Aged Brie', 1, 1)]);
    const item = gr.updateQuality()[0];
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(2);
  });

  it('should not allow a quality higher than 50', () => {
    const gr = new GildedRose([new Item('Aged Brie', 0, 50)]);
    const item = gr.updateQuality()[0];
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(50);
  });

  it('should not change the quality and sellIn of "Sulfuras"', () => {
    const gr = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 4, 80)]);
    const item = gr.updateQuality()[0];
    expect(item.sellIn).toBe(4);
    expect(item.quality).toBe(80);
  });

  it('should not change the quality and sellIn of "Sulfuras"', () => {
    const gr = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 4, 5)]);
    const item = gr.updateQuality()[0];
    expect(item.sellIn).toBe(4);
    expect(item.quality).toBe(5);
  });

  it('should update the quality of "Backstage passes" correctly', () => {
    const gr = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 0)]);
    let item = gr.updateQuality()[0];
    expect(item.sellIn).toBe(10);
    expect(item.quality).toBe(1);
    for (let i = 0; i < 5; i++) {
      item = gr.updateQuality()[0]; // quality should increase by 2 (5x)
    }
    expect(item.sellIn).toBe(5);
    expect(item.quality).toBe(11);
    for (let i = 0; i < 5; i++) {
      item = gr.updateQuality()[0]; // quality should increase by 3 (5x)
    }
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(26);
    item = gr.updateQuality()[0]; // quality should drop to 0
    expect(item.sellIn).toBe(-1);
    expect(item.quality).toBe(0);
  });
});