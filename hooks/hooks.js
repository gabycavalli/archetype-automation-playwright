import { getKCToken, removeReCaptcha } from '../utils/utils';
const data = require('../config/data.json');
import { jiraTrackingAfterEach, jiraTrackingBeforeAll } from "../utils/jira";

// Función para obtener la configuración del archivo JSON
function getConfig(env, brand) {
  if (!data[env] || !data[env][brand]) {
    throw new Error(`No se encontró la configuración para el entorno "${env}" y la marca "${brand}".`);
  }
  return data[env][brand];
}

let currentContext = null; // Variable para guardar el contexto
let pageBrowser;
let contextBrowser;

export async function beforeEachHook({ browser, env, brand }) {
  let page;
  const timeout = 120000;
  const configData = getConfig(env, brand);
  console.log(`Configuración cargada para ${env}-${brand}:`, configData);

  await jiraTrackingBeforeAll(); // jira tracking
  const token = await getKCToken();
  await removeReCaptcha(token, env, brand); // recaptcha off

  currentContext = await browser.newContext({
    ignoreHTTPSErrors: true,
    deviceScaleFactor: 1,
  });
  page = await currentContext.newPage();
  pageBrowser = page;
  contextBrowser = currentContext;

  const domain = configData.siteUrl.match(/https?:\/\/(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)[1];

  await contextBrowser.addCookies([{ // add cookies
    name: 'age-verified',
    value: 'verified',
    domain: domain,
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'None'
  }]);

  await page.goto(configData.siteUrl, { timeout });
  return { page, currentContext, configData };

}


export async function afterEachHook(testInfo) {
  await jiraTrackingAfterEach(testInfo); // jira tracking
  try {
    await pageBrowser.close();
    await currentContext.close();
    console.log('Cierre de contexto y página completado.');
  } catch (error) {
    console.error(`Error en afterEachHook: ${error.message}`);
  } finally {
    currentContext = null; // Asegurar que el contexto se restablezca después de cerrar
  }
}
