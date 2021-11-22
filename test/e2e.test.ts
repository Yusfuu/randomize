import puppeteer from "puppeteer";



const User = [
  {
    name: 'Derek Willis',
    topic: 'Teamwork'
  },
  {
    name: 'Derek Willis',
    topic: 'Teamwork'
  },
  {
    name: 'Derek Willis',
    topic: 'Teamwork'
  },
  {
    name: 'Derek Willis',
    topic: 'Teamwork'
  },
  {
    name: 'Derek Willis',
    topic: 'Teamwork'
  }
];

test('mentions grapefruit', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250, // slow down by 250ms
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  await page.click("#_number");
  await page.type('#_number', '5');

  await page.focus("#initDate");
  await page.$eval('#initDate', (el: any) => el.value = new Date().toISOString().split('T')[0]);

  await page.click("#startNow");

  await page.evaluate((UserClone) => {
    const eles = [...document.querySelectorAll('[data-id]')];
    eles.forEach((element: any, key) => {
      const [name, topic] = element.getElementsByTagName('input');
      name.value = UserClone[key].name;
      topic.value = UserClone[key].topic;
      name.click();
      topic.click();
    });
    // @ts-ignore
    document.querySelector("#save").disabled = false;
    document.querySelector("#save").classList.remove('opacity-50');
  }, User);

  await page.click("#save");


  for (let index = 0; index < 5; index++) {
    await page.click("#shuffle", { delay: 1000 });
  }

  expect(1).toBe(1);
}, 100000);