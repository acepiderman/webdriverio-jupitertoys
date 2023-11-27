const Page = require('./page');
class HomePage extends Page{

    async open () {
        await super.open('home')
    }

}
module.exports = new HomePage()