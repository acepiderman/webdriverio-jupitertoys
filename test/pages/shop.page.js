const Page = require('./page');
class ShopPage extends Page {

    get teddyBear() { return $('//li[@id="product-1"]') }
    get stuffedFrog() { return $('//li[@id="product-2"]') }
    get handmandeDoll() { return $('//li[@id="product-3"]') }
    get fluffyBunny() { return $('//li[@id="product-4"]') }
    get smileyBear() { return $('//li[@id="product-5"]') }
    get funnyCow() { return $('//li[@id="product-6"]') }
    get valentineBear() { return $('//li[@id="product-7"]') }
    get smileyFace() { return $('//li[@id="product-8"]') }

    async addToCart(item, qty) {
        for (let i = 1; i <= qty; i++) {
            await item.$('.//*[text()="Buy"]').click()
        }
    }

    async open() {
        await super.open('shop')
    }
}
module.exports = new ShopPage()