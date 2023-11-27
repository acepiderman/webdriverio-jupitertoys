/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    get homePageNav () {return $('//li[@id="nav-home"]')}
    get shopPageNav () {return $('//li[@id="nav-shop"]')}
    get contactPageNav () {return $('//li[@id="nav-contact"]')}
    get loginNav () {return $('//li[@id="nav-login"]')}
    get cartPageNav () {return $('//li[@id="nav-cart"]')}
    async open (path) {
        await browser.url(`https://jupiter.cloud.planittesting.com/#/${path}`)
        await browser.maximizeWindow()
        await expect(browser).toHaveUrl(`https://jupiter.cloud.planittesting.com/#/${path}`)
    }
}