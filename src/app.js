const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/search?q=tradutor');

    const base_language = readlineSync.question("Language: ") || "Português";
    const text = readlineSync.question("Text: ") || "Hello world";
    const final_language = readlineSync.question("Language to Translate: ") || "Inglês";

    await page.click('[class="source-language"]');
    await page.type('[class="tw-lp-search F0azHf"]', base_language);
    await page.keyboard.press(String.fromCharCode(13));

    await page.click('[class="target-language"]');
    await page.type('[class="tw-lp-search F0azHf"]', final_language);
    await page.keyboard.press(String.fromCharCode(13));
    
    await page.type('[class="tw-ta tw-text-large XcVN5d goog-textarea"]', text);
    
    await page.waitForTimeout(2000);
    const translated_text = await page.evaluate(() => {
        return document.getElementsByClassName('Y2IQFc')[2].textContent;
    });
    console.log(`\nTranslation from ${base_language} to ${final_language} is:\n`);
    console.log(translated_text);
    await browser.close();
})();
