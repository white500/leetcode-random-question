const puppeteer = require('puppeteer');

const config = require('./config.js');

(async () => {
  const browser = await puppeteer.launch({ headless: config.isOnline });
  const page = await browser.newPage();

  await page.goto('https://mawen.coding.net/admin/members');
  // await page.waitForNavigation();

  //登录
  await page.type('#userName', config.username);
  await page.type('#password', config.password);
  await page.click('.loginButton');

  await page.waitForNavigation();
  await page.waitFor(1000);

  await page.click('.cuk-button'); // 第一个按钮就是：链接批量邀请

  await page.waitFor(1000);

  const btnArray = await page.$$('.cuk-button');
  await btnArray[3].click(); // 第三个按钮是：创建连接邀请

  await page.waitFor(1000);

  const rawLinkText = await page.$eval('.cuk-modal', node => node.innerText);
  const reg = /https:\/\/.*\b/;
  const link = rawLinkText.match(reg)[0];

  console.log(link);
})();
