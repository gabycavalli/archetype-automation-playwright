import { test, expect } from '@playwright/test';
import HomePageObjects from '../pageObjects/homePageObjects';
import LoginPageObjects from '../pageObjects/loginPageObjects';
import { beforeEachHook, afterEachHook } from '../hooks/hooks';
import { runTestsForAllCombinations } from '../config/config';
import { clickLoginWithReload } from '../utils/actions';

async function runTests(env, brand) {
  test.describe(`Regresion - Login - ${env} - ${brand}`, () => {
    let page;
    let configData;
    let context;
    const expectWithTimeout = expect.configure({ timeout: 30000 });

    test.beforeEach(async ({ browser }) => {
      test.setTimeout(120000);
      process.env.ENV = env;
      process.env.BRAND = brand;
      console.log('Ejecutando test.beforeEach...');
      const hookData = await beforeEachHook({ browser, env, brand });
      page = hookData.page;
      configData = hookData.configData;
      context = hookData.context;
      console.log('test.beforeEach completado');
    });

    test.afterEach(async ({}, testInfo) => {
      console.log('Ejecutando test.afterEach...');
      await afterEachHook(testInfo);
      console.log('test.afterEach completado');
    });

    test('Invalid Login', async () => {
      test.info().annotations.push({ type: 'tag', description: '@QATC-33276' });
      const homepage = new HomePageObjects(page, brand);
      const loginpage = new LoginPageObjects(page, brand);

      await clickLoginWithReload(
        page,
        homepage.loginButton,
        loginpage.userInput,
        configData.siteUrl
      );
      await loginpage.userInput.fill(configData.userIdNoCredit);
      await loginpage.passwordInput.fill('invalidPassword');
      await loginpage.loginButton.click({ force: true });
      await expectWithTimeout(loginpage.invalidPassOrUserMessage).toBeVisible();
    });

    test('Valid Login with credit', async () => {
      test.info().annotations.push({ type: 'tag', description: '@QATC-33274' });
      const homepage = new HomePageObjects(page, brand);
      const loginpage = new LoginPageObjects(page, brand);

      await clickLoginWithReload(
        page,
        homepage.loginButton,
        loginpage.userInput,
        configData.siteUrl
      );
      await loginpage.userInput.fill(configData.usernameWithCredit);
      await loginpage.passwordInput.fill(configData.passwordWithCredit);
      await loginpage.loginButton.click();
    });
  });
}

// Function to execute all combination ENV - BRAND - BROWSERS(firefox,chromium,edge)
runTestsForAllCombinations(runTests);
