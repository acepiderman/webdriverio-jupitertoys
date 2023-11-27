const Page = require('./page');
class CartPage extends Page {

    get cartTable() { return $('//table[contains(@class,"cart-items")]') }

    async getCartRowCount() {
        const cartTable = await this.cartTable
        return cartTable.$$('//tr[contains(@class,"cart-item")]').length
    }

    async verifyCartSubTotalForEachProduct() {
        let rowCount = await this.getCartRowCount()
        for (let i = 1; i <= rowCount; i++) {
            let priceStr = await $(`//tr[contains(@class,"cart-item")][${i}]//td[2]`).getText()
            let price = priceStr.toString().replace("$", "")
            console.log("PRICE", price)
            let quantity = await $(`//tr[contains(@class,"cart-item")][${i}]//td[3]//*[@name="quantity"]`).getValue()
            console.log("QTY", quantity)
            let expectedSubtotal = Number(price) * Number(quantity)
            console.log("SUBTOTAL", expectedSubtotal)
            let subtotal = await expect($(`//tr[contains(@class,"cart-item")][${i}]//td[4]`)).toHaveTextContaining(expectedSubtotal)
        }
    }

    async verifyPricePerItem() {
        let rowCount = await this.getCartRowCount()
        let itemName = [] , itemPrice = []
        let itemsObj ={}
        for (let i = 1; i <= rowCount; i++) {
            let nameStr = await $(`//tr[contains(@class,"cart-item")][${i}]//td[1]`).getText() 
            let name = nameStr.toString().trim()
            itemName.push(name)
            let priceStr = await $(`//tr[contains(@class,"cart-item")][${i}]//td[2]`).getText()
            let price = priceStr.toString().replace("$", "")
            itemPrice.push(price)
        }
        for (let i =0 ; i< itemName.length && i < itemPrice.length; i++){
            itemsObj[itemName[i]] = itemPrice[i];
        }
        return itemsObj
    }

    async verifyTotalValue() {
        let rowCount = await this.getCartRowCount()
        let sum = 0
        for (let i = 1; i <= rowCount; i++) {
            let subtotalStr = await $(`//tr[contains(@class,"cart-item")][${i}]//td[4]`).getText()
            let subtotal = subtotalStr.toString().replace("$", "")
            sum += Number(subtotal)
        }
        console.log("SUBTOTAL SUM", sum)
        await expect($('//*[contains(@class,"total")]')).toHaveTextContaining(sum)
    }

    async open() {
        await super.open('cart')
    }
}
module.exports = new CartPage()