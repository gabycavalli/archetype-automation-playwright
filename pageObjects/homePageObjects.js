const { Page } = require('@playwright/test');

class HomePageObjects {
  /**
 * @param {Page} page - El objeto de página de Playwright
*/
  constructor(page,brand) {
    this.page = page;
    this.brand = brand || 'bol';

    const locators = {
      bol: {
        loginButton: this.page.locator('button[data-testid="button"]').filter({ hasText: 'login' }),
      },
      gc: {
        loginButton: this.page.getByRole('button', { name: 'Login' }),
      },
    };

    this.loginButton = locators[this.brand].loginButton;

  }
}

module.exports = HomePageObjects;