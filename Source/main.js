/** WELCOME TO AN AUTOMATED LOGIN PROGRAM THAT CAN BYPASS HCAPTCHA
 * TO USE, NEED NODE.JS, PUPPETEER, PUPPETEER-EXTRA, PUPPETEER-EXTRA-PLUGIN-STEALTH INSTALLED
 * RUN USING "Node ./main.js"
 * WILL OPEN UP BROWSER AND WITH THE GIVEN ACCESSORS SHOULD FIND AND WRITE TEXT TO THOSE FIELDS, AND THEN PRESS THE GIVEN BUTTON
 * LIKE FOR WRITING A USERNAME AND PASSWORD IN A LOGIN PAGE, AND PRESSING THE LOGIN BUTTON
 * 
 */

/***********************
 * PUPPETEER IMPORTS 
 **********************/
// const puppeteer = require('puppeteer'); // for regular puppeteer - overshadowed by puppeteer-extra
const puppeteer_extra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer_extra.use(StealthPlugin); // use the stealth plugin in to help deter bot detection

// FILE OBJECT AND READING SECRET DATA
const file_io = require('fs'); // for file input and output
// read static secrets and parse them into an object -> obj.field
let secretdata = file_io.readFileSync('.secret.json');
const secret = JSON.parse(secretdata);


// URL CONSTS FOR TESTING
// const boturl = 'https://bot.sannysoft.com/'; // test if you look like a bot or not


const main = async () => {
    const browser = await puppeteer_extra.launch({
        executablePath: secret.EXEC_PATH,
        defaultViewport: null, // wow so in fullscreen, it clicks the right button, in default view it accidently clicks the button
        headless: false, // dont run headless, to see what is going on in the browser
        // args: ['--disable-web-security', // disable a bunch of shit
        //     '--disable-features=IsolateOrigins,site-per-process',
        //     '--disable-features=IsolateOrigins,site-per-process,SitePerProcess',
        //     '--flag-switches-begin --disable-site-isolation-trials --flag-switches-end'],

    });
    let page = await browser.newPage();
    await page.goto(url, {
        // wait until the page is fully loaded? can be useful, but can be elonged with ads and such
        waitUntil: "networkidle2",
    });

    // testing
    console.log("USER: " + secret.USERNAME + "\nPASS: "+ secret.URL);


}


// CALL MAIN FUNCTION
main();