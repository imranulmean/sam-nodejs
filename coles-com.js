import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const url = 'https://www.coles.com.au/browse/dairy-eggs-fridge?pid=homepage_cat_explorer_dairy_eggs_fridge';
const mainDomain="https://www.coles.com.au/";
const visitedURLs = []; 
const productURLs = new Set(); 
 const paginationQueueURLsToVisit = ["/browse/dairy-eggs-fridge?pid=homepage_cat_explorer_dairy_eggs_fridge"];
const maxPages = 50;
const products=[];
let count=0;

async function webSpider() {     

    ////////////////Get the Paginations//////////////    
    while(paginationQueueURLsToVisit.length !== 0 && visitedURLs.length <= maxPages  ){
      const paginationURLRoot = paginationQueueURLsToVisit.pop();
      if(!paginationURLRoot || paginationURLRoot==='undefined' || paginationURLRoot===undefined){
        break;
      }
      const pageHTML1 = await axios.get(`${mainDomain}${paginationURLRoot}`);
      visitedURLs.push(paginationURLRoot);
      const $ = cheerio.load(pageHTML1.data);

      ///////////// Get Products Information ////////////
        const productTiles = $('[data-testid="product-tile"]');
        let onPageProducts=[];
        let paginationObj={
          "paginationUrl":`${mainDomain}${paginationURLRoot}`
        };
        productTiles.each((index, element) => {
          const productTitle = $(element).find('.product__title').text().trim();
          const productPrice = $(element).find('.price__value').text();
          const cleanedPrice = productPrice.replace(/\$([0-9]+\.[0-9]+)\$\1/, '$$$1');
          console.log(`Product Title ${index + 1}: ${productTitle} Price: ${cleanedPrice}`);
          let productInfo={productTitle, productPrice:cleanedPrice};
          onPageProducts.push(JSON.stringify(productInfo));
          count++;
      });      
      paginationObj['onPageProducts']=onPageProducts;
      products.push(paginationObj);

      ///////////Now Get the Paginations Number //////////
      $('[data-testid="pagination"] li').each((index, element) => {
        const paginationPageUrl = $(element).find("a").attr("href");
        if(!visitedURLs.includes(paginationPageUrl) && !paginationQueueURLsToVisit.includes(paginationPageUrl)){
          paginationQueueURLsToVisit.push(paginationPageUrl)
        }
      });
    }
    let obj={
      "totalProducts":count,
      products,
    }
      // console.log("Products:", obj);
    const productsString = JSON.stringify(obj, null, 2);
    fs.writeFileSync('./products.txt', productsString);
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

