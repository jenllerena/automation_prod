require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const xl = require('excel4node');

describe('Checkout Google.com', function () {
    let driver;
    let name;
    let rate;
    let price;
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Sheet 1');

// Create a reusable style
    const style = wb.createStyle({
        font: {
            color: '#000000',
            size: 12,
        }
        // numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('Search on amazon', async function () {
        await driver.get('https://amazon.com');
        await driver.findElement(By.id('twotabsearchtextbox')).click();
        await driver.findElement(By.id('twotabsearchtextbox')).sendKeys('ipad pro', Key.RETURN);

        name = await driver.findElement(By.className('a-size-medium a-color-base a-text-normal'))
        price = await driver.findElement(By.className('a-price-whole'))
        await driver.findElement(By.className('a-icon a-icon-star-small a-star-small-4-5 aok-align-bottom')).click();
        await driver.wait(until.elementLocated(By.className('a-size-medium a-color-base a-text-beside-button a-text-bold')), 10000);
        rate = await driver.findElement(By.className('a-size-medium a-color-base a-text-beside-button a-text-bold'))

        await ws.cell(1, 1)
            .string('product')
            .style(style);

        await ws.cell(1, 2)
            .string('price')
            .style(style);

        await ws.cell(1, 3)
            .string('rate')
            .style(style);

        await ws.cell(2, 1)
            .string(await name.getText())
            .style(style);


        await ws.cell(2, 2)
            .string(await price.getText())
            .style(style);


        await ws.cell(2, 3)
            .string(await rate.getText())
            .style(style);

        await wb.write('final.xlsx');
        // await driver.findElement(By.linkText('New Apple iPhone SE (64GB, Black) [Carrier Locked] + Carrier Subscription [Cricket Wireless]')).click();

    });

    after(() => driver && driver.quit());
})
