# Automation with Playwright

This project pretends to bring an archetype for those teams wanting to start with Playwright.

# Features
- Execute test with all combinations of BRAND - ENV (checking ALL option) browsers chromium, firefox and webkit.
- Run test with specific BRAND and ENV by selecting them in Jenkins.
- Run test in Browserstack by selecting the device or operating system available in Jenkins.
- HTML report added to Jenkins task.
- Screenshots of failed tests.
- JiraTracking integrated.
- iOS emulation devices.
- Cron test executions.

## Pre-requisites
- NodeJS https://nodejs.org/en/download/ (With Admin account)

## install
```bash
npm i 
```
- You can install `Playwright Test for VSCode extension` to help with tests executions, recorder, and more.

## Data set
You could see de data set file on path `./config/data.json`

## Environments

List of environments in use.
- qa
- ppd

List of brands in use.
- bol
- gc

Commands on cmd execution
- `--workers = 1` : Sets the number of parallel workers (test runners) to 1, meaning tests will run sequentially, one after the other.

- `--timeout = 10000` : Sets a timeout for each individual test to 10,000 milliseconds (10 seconds). If a test takes longer than this to complete, it will fail due to timeout.

- `--headed` : Runs the tests in headed mode, meaning the browser will be visible during test execution (instead of headless mode where the browser runs in the background without UI).

- `--grep "test_name"` : Runs only tests whose names match the given regular expression "test_name". Useful when you want to run specific tests based on their names.

- `--project=` : Define the browser and could be chromium - firefox - webkit

## Run different test cases

- To open UI platform
```bash
npx playwright test --ui
```

- Execute all tests combinations with headed ENV, BRAND with chrome, firefox and safari
```bash
ALL=true npx playwright test --headed
```

- Execute all tests combinations headless ENV, BRAND with chrome, firefox and safari
```bash
ALL=true npx playwright test --workers=1
```

- Execute specific test with headed with specific ENV, BRAND with chrome, firefox and safari
```bash
ENV=qa BRAND=bol npx playwright test --headed --grep "nombre-del-test"
```

- Execute specific test with headless with specific ENV, BRAND with chrome, firefox and safari
```bash
ENV=qa BRAND=bol npx playwright test --grep "nombre-del-test"

ENV=qa BRAND=bol npx playwright test --workers=1 --grep "REGRESION" --project=firefox --project=chromium
```

- Browserstack execution examples(check devices and OS availables on browserstack.yml --> platforms)
```bash
ENV=qa BRAND=bol npx browserstack-node-sdk playwright test --config=./playwright.config.js --project=Monterey_Latest_Webkit --grep "Login"

ALL=true npx browserstack-node-sdk playwright test --config=./playwright.config.js --project=Ventura_Latest_Webkit
```
- Executing locally with JiraTracking
```bash
ENV=qa BRAND=bol JIRA_TRACKING=true JIRA_USERNAME=your_username JIRA_PASSWORD=your_password JIRA_SERVER="https://jira.itspty.com" JIRA_PROJECT_ID="16901" npx playwright test --workers=1 --project=chromium --grep "Invalid Login"
```

- if you use the extension `Playwright Test for VSCode` to execute the test, you need to configure the ENV and BRAND on the `./config/config.js` file, just change `'qa'` and `'bol'` by what you want to use.
```javascript
const env = process.env.ENV || 'qa';
const brand = process.env.BRAND || 'bol';
```
