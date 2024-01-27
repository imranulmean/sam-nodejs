import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const url = 'https://www.coles.com.au/browse/dairy-eggs-fridge?pid=homepage_cat_explorer_dairy_eggs_fridge';
const visitedURLs = []; 
const productURLs = new Set(); 
const paginationQueueURLsToVisit = ["https://www.coles.com.au/browse/dairy-eggs-fridge?pid=homepage_cat_explorer_dairy_eggs_fridge"]; 

async function webSpider() {     
    //  const pageHTML = await axios.get(url);
    //  const $ = cheerio.load(pageHTML.data); 
    // // fs.writeFileSync('./page.txt', pageHTML.data);

    ////////////////Get the Paginations//////////////
    const paginationURLRoot = paginationQueueURLsToVisit.pop();
    const pageHTML1 = await axios.get(paginationURLRoot);
    visitedURLs.push(paginationURLRoot);
		const $ = cheerio.load(pageHTML1.data); 
		$('[data-testid="pagination"] li').each((index, element) => {
      console.log($(element).find("a").attr("href"))
		});
    console.log(paginationQueueURLsToVisit);
    ///////////////////////////

    // const productTiles = $('[data-testid="product-tile"]');
    // productTiles.each((index, element) => {
    //   // Process each element as needed
    //   const productTitle = $(element).find('.product__title').text().trim();
    //   const productPrice = $(element).find('.price__value').text();
    //   const cleanedPrice = productPrice.replace(/\$([0-9]+\.[0-9]+)\$\1/, '$$$1');     
    //   console.log(`Product Title ${index + 1}: ${productTitle} Price: ${cleanedPrice}`);
  // });

} 

 webSpider();

// async function getPublicIP() {
//     try {
//       const response = await axios.get('https://api64.ipify.org?format=json');
//       const ipAddress = response.data;
//       console.log('Your public IP address is:', ipAddress);
//     } catch (error) {
//       console.error('Error fetching public IP:', error.message);
//     }
//   }
  
//   getPublicIP();

