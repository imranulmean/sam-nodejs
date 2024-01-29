import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import puppeteer from 'puppeteer';

const mainDomain="https://www.woolworths.com.au/";
const visitedURLs = []; 
const productURLs = new Set(); 
 const paginationQueueURLsToVisit = ["shop/browse/fruit-veg"];
const maxPages = 50;
const products=[];


async function scrapeWoolworths() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
      // Navigate to the Woolworths Fruit & Veg page
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      await page.goto('https://www.woolworths.com.au/shop/browse/fruit-veg', {
        waitUntil: 'networkidle2',
      });
      await page.waitForResponse(response => response.status() === 200); 
        await page.screenshot({ path: 'example.png' });

      
      // Wait for the dynamic content to be loaded (adjust the selector as needed)
      await page.waitForSelector('.ng-star-inserted');
  
      // Get the HTML content of the page after dynamic content has loaded
      const html = await page.content();
      fs.writeFileSync('./wools2.txt', html);
      
      // Load the HTML into Cheerio
      const $ = cheerio.load(html);
  
      // Extract data using Cheerio selectors
      console.log($(".title").length);
      
  
      // Print the scraped data
      for (let i = 0; i < productTitles.length; i++) {
        console.log(`Product Title: ${productTitles[i]}, Price: ${productPrices[i]}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      // Close the browser
      await browser.close();
    }
  }
  
  // Run the scraper function
  scrapeWoolworths();


