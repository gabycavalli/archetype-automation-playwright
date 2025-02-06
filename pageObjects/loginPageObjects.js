const { Page } = require('@playwright/test');

class LoginPageObjects {
  /**
   * @param {Page} page - El objeto de página de Playwright
   */
  constructor(page, brand) {
    this.page = page;
    this.brand = brand || 'xxx'; // Valor por defecto 'bol'

    const locators = {
      site: {
        //login form
        userInput: this.page.locator('input[name="username"]'),
        passwordInput: this.page.locator('input[name="password"]'),
        loginButton: this.page.locator('button[type="submit"]'),
      },
    };
    //login form
    this.userInput = locators[this.brand].userInput;
    this.passwordInput = locators[this.brand].passwordInput;
    this.loginButton = locators[this.brand].loginButton;
    this.invalidPassOrUserMessage =
      locators[this.brand].invalidPassOrUserMessage;
  }
}

module.exports = LoginPageObjects;
