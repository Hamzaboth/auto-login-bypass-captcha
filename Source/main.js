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
        // defaultViewport: null, // wow so in fullscreen, it clicks the right button, in default view it accidently clicks the button
        headless: false, // dont run headless, to see what is going on in the browser
        // args: ['--disable-web-security', // disable a bunch of shit
        //     '--disable-features=IsolateOrigins,site-per-process',
        //     '--disable-features=IsolateOrigins,site-per-process,SitePerProcess',
        //     '--flag-switches-begin --disable-site-isolation-trials --flag-switches-end'],

    });
    let page = await browser.newPage();
    await page.goto(secret.URL, {
        // wait until the page is fully loaded? can be useful, but can be elonged with ads and such
        waitUntil: "networkidle2",
    });

    //  with page open, read file for passphrase
    // worry about closing files later
    let phrases = file_io.readFileSync('.secretphrases').toString();
    phrases = phrases.split('\n');

    // CHECK PASSPHRASE AGAINST USED PREVIOUSLY
    let passphrase = 'wrong';
    let used_words = file_io.readFileSync(".secretfailed").toString();

    for (const word of phrases) {
        if (!(used_words.includes(word))) {
            passphrase = word;
            break;
        }
    }
    // passphrase = phrases[1];

    // console.log(passphrase);

    // LOGIN PAGE
    await page.waitForSelector(secret.USERNAME_FIELD); // type id, or type 
    await page.type(secret.USERNAME_FIELD, secret.USERNAME); // type="text"
    await page.type(secret.PASSWORD_FIELD, passphrase); // type="password"

    // then press the login button
    await page.click(secret.LOGIN_BUTTON); // type="submit"


    await new Promise(r => setTimeout(r, 2200)); // wait for popup

    /// GRAB IFRAME SELECTOR
    // https://newassets.hcaptcha.com/captcha/v1
    // #checkbox

    // uses an iframe for the captcha. fun stuff to deal with
    attempt: try {
        //await page.waitForSelector(secret.IFRAME1, {hidden: false, delay: 200});
        
        // // FIND HCAPTCHA IFRAME
        await page.click('[type=button]'); // so far this is only thing that works..
        console.log('clicked');
        // const iframes = await page.frames();
        // const iframe_found = iframes.find((frame) => frame.url().includes(secret.IFRAME1));
        // // const test = iframe_found.$(secret.HCAPTCHA_BUTTON);
        
        // await iframe_found.waitForSelector(secret.HCAPTCHA_BUTTON);
        // console.log('here');
        // await iframe_found.click(secret.HCAPTCHA_BUTTON);
     
        console.log("captcha pressed");
        
     


        // DO MANUAL CAPTCHA   

        // select the menu info
        await new Promise(r => setTimeout(r, 2000));
        const frames2 = await page.frames();       
        const frame2 = frames2.find((frame) => frame.url().includes(secret.IFRAME1));
        // console.log(frame2);
        await frame2.click("[id=menu-info]");

        console.log('menu button');

        // Select Text Challenge
        await new Promise(r => setTimeout(r, 1000));
        const frames3 = await page.frames();
                const frame3 = frames3.find((frame) => frame.url().includes(secret.IFRAME1));
        // console.log(frame2);
        await frame3.click("[id=text_challenge]");
        console.log('text button');
         

        
        //  reading and using DEEPAI to answer
        // consts     
        const url_ai = secret.AI_URL;
        // can you answer this question with a yes or no: 
        const initq = "can you answer this question with a yes or no: ";

        /*****
        * 1 *
        ****/
        for (let i = 0; i <= 10; i++) {
            await new Promise(r => setTimeout(r, 2000));
            const frames4 = await page.frames();            
            const frame4 = frames4.find((frame) => frame.url().includes(secret.IFRAME1));
            
            let read_text = await frame4.$eval("#prompt-text > span", (el) => el.innerText);
            console.log(read_text);
            
            // collect a stash of all text challenges. for science
            file_io.appendFile('text_stash.txt', read_text.concat('\n'), (err) => {
                if (err) {
                    console.log("Something went wrong with file, oops");
                    throw err;
                }               
            });

            // create a new page for deepai, instead of having to scroll and find new texts. keep it simple with static homepage
            const browser_ai = await puppeteer_extra.launch({
                executablePath: secret.EXEC_PATH,
                defaultViewport: null,
                headless: false, // dont run headless, to see what is going on in the browser
                // args: ['--disable-web-security', // disable a bunch of shit
                //     '--disable-features=IsolateOrigins,site-per-process',
                //     '--disable-features=IsolateOrigins,site-per-process,SitePerProcess',
                //     '--flag-switches-begin --disable-site-isolation-trials --flag-switches-end'],

            });

            let page_ai = await browser_ai.newPage();
            await page_ai.goto(url_ai, {
                waitUntil: "networkidle2",
            });


            // find the text box to enter the question

            // then get use the text from the hcaptcha and concatenate
            await page_ai.waitForSelector('#chatboxWrapperId_0 > textarea'); // type id, or type 
            // simulate a scroll with down key
            await page_ai.keyboard.press("ArrowDown");
            await page_ai.keyboard.press("ArrowDown");
            await page_ai.keyboard.press("ArrowDown");
            await page_ai.keyboard.press("ArrowDown");
            await page_ai.keyboard.press("ArrowDown");
            await page_ai.keyboard.press("ArrowDown");
            await page_ai.keyboard.press("ArrowDown");
            await page_ai.keyboard.press("ArrowDown");
            await page_ai.keyboard.press("ArrowDown");
            await page_ai.type('#chatboxWrapperId_0 > textarea', initq.concat(read_text)); // type="text"


            await page_ai.focus('#chatSubmitButton');
            await new Promise(r => setTimeout(r, 1000));
       
            await page_ai.waitForSelector('#chatSubmitButton'); // 
            await page_ai.click('#chatSubmitButton');


             
            await new Promise(r => setTimeout(r, 2000));
       
            await page_ai.waitForSelector('body > div.outputBox'); // type id, or type 
            read_answer1 = await page_ai.$eval("body > div.outputBox", (el) => el.innerText);
            
            await browser_ai.close(); // close browser for next step
            // console.log(read_answer1);
            real_answer1 = read_answer1.substring(0, 3);
            // check for period for no, other wise should be yes, then add newline to "press" enter
            if (real_answer1.includes('.')) {
                real_answer1 = real_answer1.substring(0, 2);
            }
            real_answer1 = real_answer1.concat('\n');

            console.log(real_answer1);
        


            // then find the answer from deepai and grab it, and then go back to discord and enter it into the text challenge box
            await new Promise(r => setTimeout(r, 1000));
            const frames7 = await page.frames();
            
            const frame7 = frames7.find((frame) => frame.url().includes(secret.IFRAME1));
            // console.log(frame2);
            await frame7.type("body > div > div.challenge-container > div > div > div.challenge-input > input", real_answer1, { delay: 50 });
            console.log("enter an answer");
           
            // then click next text challenge and repeat
            await new Promise(r => setTimeout(r, 100));

        }
       
        break attempt; // break off from try block, continue on
       

    } catch (captcha_error) {
        // await page.screenshot({ path: 'done.png' });
        console.log("ERROR - or completed the password so now what to do?");

    } finally {
        // if you want to compile a visual log
        // await page.screenshot({ path: 'secret.png' });
        file_io.appendFile('.secretfailed', passphrase.concat('\n'), (err) => {
            if (err) {
                console.log("Something went wrong with file, oops");
                throw err;
            }
            else
                console.log("something went right");
        });
        console.log("logging used password");
    }

}


// CALL MAIN FUNCTION
main();