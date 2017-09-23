const EMAIL = process.env.FUCKBOOK_EMAIL;
const PASSWORD = process.env.FUCKBOOK_PASSWORD;
const PROFILE_URL = process.env.FUCKBOOK_PROFILE_URL;

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--window-size=1280,900',
    ],
    headless: false,
    slowMo: 100,
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1280,
    height: 720,
  });

  await page.goto('https://facebook.com');
  await page.screenshot({
    path: 'screenshots/01-home.png',
  });


  const emailInput = await page.$('#email');
  await emailInput.click();
  await page.type(EMAIL);

  const passwordInput = await page.$('#pass');
  await passwordInput.click();
  await page.type(PASSWORD);

  const loginButton = await page.$('label#loginbutton input');
  await loginButton.click();
  await page.waitFor('.fbUserContent');
  await page.screenshot({
    path: 'screenshots/02-logged-in.png',
  });

  await page.goto(`https://www.facebook.com/${PROFILE_URL}/allactivity`);
  await page.screenshot({
    path: 'screenshots/03-activity-log.png',
  });

  await browser.close();
})();
