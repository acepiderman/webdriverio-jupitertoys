const Page = require('./page');
class ContactPage extends Page {

    get forenameTextbox() { return $('//input[@id="forename"]') }
    get surnameTextbox() { return $('//input[@id="surname"]') }
    get emailTextbox() { return $('//input[@id="email"]') }
    get telephoneTextbox() { return $('//input[@id="telephone"]') }
    get messageTextarea() { return $('//textarea[@id="message"]') }
    get submitButton() { return $('//div[@class="form-actions"]//*[text()="Submit"]') }

    get forenameValidationMsg() { return $('//span[@id="forename-err"]') }
    get emailValidationMsg() { return $('//span[@id="email-err"]') }
    get messageValidationMsg() { return $('//span[@id="message-err"]') }

    get validSubmitMsg() { return $('//div[contains(@class,"alert-success")]') }

    get sendingFeedbackSpinner() { return $('//div[contains(@class,"popup")]') }

    async open() {
        await super.open('contact')
    }

    async submit() {
        await this.submitButton.click()
    }

    async populateRequiredFields(forename, email, message) {
        await this.forenameTextbox.setValue(forename)
        await this.emailTextbox.setValue(email)
        await this.messageTextarea.setValue(message)
    }

}
module.exports = new ContactPage()