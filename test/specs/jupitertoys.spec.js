const HomePage = require('../pages/home.page')
const ShopPage = require('../pages/shop.page')
const ContactPage = require('../pages/contact.page')
const CartPage = require('../pages/cart.page')
describe("Planit Technical Assessment", () => {

    it("Test Case 1", async () => {

        //1.	From the home page go to contact page
        await HomePage.open()
        await HomePage.contactPageNav.click()

        //2.	Click submit button
        await ContactPage.submit()

        //3.	Verify error messages
        await expect(ContactPage.forenameValidationMsg).toHaveText('Forename is required')
        await expect(ContactPage.emailValidationMsg).toHaveText('Email is required')
        await expect(ContactPage.messageValidationMsg).toHaveText('Message is required')

        //4.	Populate mandatory fields
        await ContactPage.populateRequiredFields('Ace', 'ace@ace.com', 'Test msg ace')

        //5.	Validate errors are gone
        await expect(ContactPage.forenameValidationMsg).not.toBeExisting()
        await expect(ContactPage.emailValidationMsg).not.toBeExisting()
        await expect(ContactPage.messageValidationMsg).not.toBeExisting()
    })
    let testData = [
        { args: ['Ace1', 'ace1@ace.com', 'test msg ace1'] },
        { args: ['Ace2', 'ace2@ace.com', 'test msg ace2'] },
        { args: ['Ace3', 'ace3@ace.com', 'test msg ace3'] },
        { args: ['Ace4', 'ace4@ace.com', 'test msg ace4'] },
        { args: ['Ace5', 'ace5@ace.com', 'test msg ace5'] }
    ]
    testData.forEach(({ args }) => {
        it('Test Case 2', async () => {
            //1.	From the home page go to contact page
            await HomePage.open()
            await HomePage.contactPageNav.click()

            //2.	Populate mandatory fields
            await ContactPage.populateRequiredFields(args[0], args[1], args[2])

            //3.	Click submit button
            await ContactPage.submit()

            //4.	Validate successful submission message
            await ContactPage.sendingFeedbackSpinner.waitForDisplayed({ timeout: 30000, reverse: true })
            await expect(ContactPage.validSubmitMsg).toHaveTextContaining(`Thanks ${args[0]}, we appreciate your feedback.`)

            // Note: Run this test 5 times to ensure 100% pass rate

        })
    })
    it('Test Case 3', async () => {

        //1.	Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
        await ShopPage.open()
        await ShopPage.addToCart(ShopPage.stuffedFrog, 2)
        await ShopPage.addToCart(ShopPage.fluffyBunny, 5)
        await ShopPage.addToCart(ShopPage.valentineBear, 3)

        //2.	Go to the cart page
        await ShopPage.cartPageNav.click()

        //3.	Verify the subtotal for each product is correct
        await CartPage.verifyCartSubTotalForEachProduct()

        //4.	Verify the price for each product
        let cartItems = await CartPage.verifyPricePerItem()
        for (const [key, value] of Object.entries(cartItems)) {
            await ShopPage.open()
            await expect($(`//li[contains(@class,"product")]//*[contains(text(),"${key}")]//following-sibling::p`)).toHaveTextContaining(`${value}`)            
            console.log(`${key}: ${value}`);
        }
        await CartPage.open()
        //5.	Verify that total = sum(sub totals)
        await CartPage.verifyTotalValue()

    })
})