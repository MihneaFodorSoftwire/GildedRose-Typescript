const {expect} = require('chai');
import { Item, GildedRose } from '../app/gilded-rose';

const itemNames = {
    AgedBrie: "Aged Brie",
    Sulfuras: "Sulfuras",
    Foo: "foo",
    ConjuredFoo: "Conjured foo",
    ConjuredCake: "Conjured Mana Cake",
    SulfurasLegendary: "Sulfuras, Hand of Ragnaros",
    Backstage: "Backstage passes"
}

describe('Normal object', function () {
    it('Quality at 0', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Foo, 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Foo);
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });
    it('Usual case', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Foo, 10, 40)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Foo);
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(39);
    });
    it('Degrading twice as fast', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Foo, 0, 40)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Foo);
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(38);
    });
    it('Usual case 2', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Foo, 3, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Foo);
        expect(items[0].sellIn).to.equal(2);
        expect(items[0].quality).to.equal(49);
    });
});

describe('Aged Brie', function () {
    it('Usual case', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.AgedBrie, 3, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.AgedBrie);
        expect(items[0].sellIn).to.equal(2);
        expect(items[0].quality).to.equal(6);
    });
    it('Max quality', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.AgedBrie, 3, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.AgedBrie);
        expect(items[0].sellIn).to.equal(2);
        expect(items[0].quality).to.equal(50);
    });
    it('Negative SellIn', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.AgedBrie, 0, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.AgedBrie);
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(6);
    });
});

describe('Backstage passes', function () {
    it('< 5', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Backstage, 5, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Backstage);
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(8);
    });
    it('< 10', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Backstage, 10, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Backstage);
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(7);
    });
    it('>= 10', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Backstage, 20, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Backstage);
        expect(items[0].sellIn).to.equal(19);
        expect(items[0].quality).to.equal(6);
    });
    it('Max quality', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Backstage, 20, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Backstage);
        expect(items[0].sellIn).to.equal(19);
        expect(items[0].quality).to.equal(50);
    });
    it('Expired', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Backstage, 0, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Backstage);
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });
});

describe('Sulfuras', function () {
    it('The one and only', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.SulfurasLegendary, 0, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.SulfurasLegendary);
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(80);
    });
    it('The second one...?', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Sulfuras, 0, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Sulfuras);
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(80);
    });
});

describe('Conjured', function () {
    it('Usual case', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.ConjuredCake, 1, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.ConjuredCake);
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(8);
    });
    it('Negative sellIn', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.ConjuredCake, 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.ConjuredCake);
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(6);
    });
    it('Another conjured item', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.ConjuredFoo, 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.ConjuredFoo);
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(6);
    });
});

describe('Multiple iterations', function () {
    it('Conjure', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.ConjuredCake, 1, 10)]);
        gildedRose.updateQuality()
        const items = gildedRose.updateQuality()
        expect(items[0].name).to.equal(itemNames.ConjuredCake)
        expect(items[0].sellIn).to.equal(-1)
        expect(items[0].quality).to.equal(4)
    });
    it('Will expire', function() {
        const gildedRose = new GildedRose([ new Item(itemNames.Backstage, 1, 5)]);
        gildedRose.updateQuality()
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal(itemNames.Backstage);
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });
});
