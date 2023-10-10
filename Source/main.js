/** WELCOME TO AN AUTOMATED LOGIN PROGRAM THAT CAN BYPASS HCAPTCHA
 * TO USE, NEED NODE.JS, PUPPETEER, PUPPETEER-EXTRA, PUPPETEER-EXTRA-PLUGIN-STEALTH INSTALLED
 * RUN USING "Node ./main.js"
 * WILL OPEN UP BROWSER AND WITH THE GIVEN ACCESSORS SHOULD FIND AND WRITE TEXT TO THOSE FIELDS, AND THEN PRESS THE GIVEN BUTTON
 * LIKE FOR WRITING A USERNAME AND PASSWORD IN A LOGIN PAGE, AND PRESSING THE LOGIN BUTTON
 * 
 */

/***********************
 * SECRET IMPORTS 
 **********************/
// import { } from 
// const _SECRETS = require("./secret.json");

/***********************
 * PUPPETEER IMPORTS 
 **********************/
// const puppeteer = require('puppeteer'); // for regular puppeteer - overshadowed by puppeteer-extra
const puppeteer_extra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer_extra.use(StealthPlugin); // use the stealth plugin in to help deter bot detection

// FILE OBJECT
const file_io = require('fs'); // for file input and output


// URL CONSTS FOR TESTING
const boturl = 'https://bot.sannysoft.com/'; // test if you look like a bot or not
// const url = 

const main = async () => {
    // SETUP PAGE
    // const browser = await p_extra.launch({
    //     headless: false, // dont run headless, to see what is going on in the browser
    //     args:  ['--disable-web-security', // disable a bunch of shit - might be overkill but something i found
    //     '--disable-features=IsolateOrigins,site-per-process', 
    //     '--disable-features=IsolateOrigins,site-per-process,SitePerProcess',
    //     '--flag-switches-begin --disable-site-isolation-trials --flag-switches-end'], 

    // });
    // let page = await browser.newPage();
    // await page.goto(url, {
    //     waitUntil: "networkidle2",
    // });

    // testing
    console.log("USER: " + _SECRETS.USERNAME + "\nPASS"+_SECRETS.PASSWORD);


}


// CALL MAIN FUNCTION
main();