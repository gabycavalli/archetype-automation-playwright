const { Page, BrowserContext, Browser } = require('@playwright/test');

/**
 * Clicks on an element and, if the visibility check for another element fails,
 * reloads the page and navigates to the specified URL.
 *
 * @param {object} clickElement - The element to click on (e.g., a button).
 * @param {object} verifyElement - The element to verify (e.g., a button).
 * @param {string} siteUrl - The URL to navigate to if the element is not enabled.
 * @param {number} [defaultTimeout=10000] - Time to wait for the element to become visible (optional, default is 10 seconds).
 */
async function clickLoginWithReload(page, clickElement, verifyElement, siteUrl, defaultTimeout = 60000) {
  try {
    await clickElement.click({ timeout: defaultTimeout });
    await verifyElement.waitFor({ state: 'visible', timeout: 15000 });
  } catch (error) {
    console.log(`Element not enabled or visible, redirecting to LOGIN`);
    await clickElement.page().goto(siteUrl + 'login', { timeout: defaultTimeout });
  }

}

module.exports = { clickLoginWithReload };
