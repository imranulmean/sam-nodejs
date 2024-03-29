import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
dotenv.config();

const url = 'https://www.amazon.com/Logitech-C920x-Pro-HD-Webcam/dp/B085TFF7M1/ref=sr_1_1_sspa?crid=3N94NSSDWEK20&keywords=webcam&qid=1701005222&sprefix=webcam%2Caps%2C390&sr=8-1-spons&ufe=app_do%3Aamzn1.fos.304cacc1-b508-45fb-a37f-a2c47c48c32f&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1';
const maxPages = 1;
const param={
    region: process.env.region,
    // accesskey:process.env.accesskey,
    // secretAccessKey:process.env.secretAccessKey
}

AWS.config.update(param);
const sqsAmazon = new AWS.SQS({apiVersion: '2012-11-05'});
const queueUrl=process.env.queueUrl;

export const handler = async (event,context) =>{
  await webSpider_AmazonSQS();
}



async function webSpider_AmazonSQS() { 
    
	// initialized with the first webpage to visit 
	const paginationQueueURLsToVisit = ["https://scrapeme.live/shop"]; 
	const visitedURLs = []; 
 
	const productURLs = new Set(); 
	while ( 
		paginationQueueURLsToVisit.length !== 0 && 
		visitedURLs.length <= maxPages 
	) { 
		// Get the Very first URL from the queue to crawl to list all the paginated URL. ex: page1,page2,...
		const paginationURLRoot = paginationQueueURLsToVisit.pop();
    console.log(paginationURLRoot);
		const pageHTML = await axios.get(paginationURLRoot);
		visitedURLs.push(paginationURLRoot); 
		const $ = cheerio.load(pageHTML.data); 
		$(".page-numbers a").each((index, element) => {
			const paginationPageUrl = $(element).attr("href"); 
			if ( 
				!visitedURLs.includes(paginationPageUrl) && 
				!paginationQueueURLsToVisit.includes(paginationPageUrl) 
			) { 
				paginationQueueURLsToVisit.push(paginationPageUrl)
			} 
		}); 
        for(let p of paginationQueueURLsToVisit){
            await sqsSendMessage(p);
        }
        console.log(`Visited URLS Current Length ${visitedURLs.length}`);
	} 
 	// logging the crawling results 
   console.log(paginationQueueURLsToVisit); 
//	console.log([...productURLs]);
} 

const sqsSendMessage = async (messageData) =>{
    var params = {
        // Remove DelaySeconds parameter and value for FIFO queues
       DelaySeconds: 0,
    //    MessageAttributes: {
    //      "Title": {
    //        DataType: "String",
    //        StringValue: "The Whistler"
    //      },
    //      "Author": {
    //        DataType: "String",
    //        StringValue: "John Grisham"
    //      },
    //      "WeeksOn": {
    //        DataType: "Number",
    //        StringValue: "6"
    //      }
    //    },
       MessageBody:messageData,
       // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
       // MessageGroupId: "Group1",  // Required for FIFO queues
       QueueUrl: queueUrl
     };

     try {
      const sendSqsMessage= await sqsAmazon.sendMessage(params).promise();
      console.log(sendSqsMessage.MessageId);
      return sendSqsMessage;
     } catch (error) {
      console.log(error);
     }    
}

// await handler();
// running the main() function 
//  webSpider_AmazonSQS();
// webSpider() 
// 	.then(() => { 
// 		// successful ending 
// 		process.exit(0); 
// 	}) 
// 	.catch((e) => { 
// 		// logging the error message 
// 		console.error(e); 
 
// 		// unsuccessful ending 
// 		process.exit(1); 
// 	});



function scrapeContent() {
 
	// use productURLs for scraping purposes...     

//     axios.get(url)
//       .then(response => {
//         if (response.status === 200) {
//           const html = response.data;
//           const $ = cheerio.load(html);

//             // const corePriceDisplayContent = $('.a-price-whole').text();


//     // ################ This is sending SNS Topic #############
//     // const prices = [];
//     // $('.a-price-whole').each((index,elem)=>{
//     //     prices.push($(elem).text());
//     // })
//     // console.log(`Showing the price for the product ${prices[0]}`);        
//             // if(prices[0]>0){
//             //     console.log("sending email");
//             //     console.log(`Your Pricing is now ${prices[0]}`);
//             //     let msgParams = {
//             //         Message: `Your Pricing is now ${prices[0]}, here is the link ${url}`, /* required */
//             //         TopicArn: 'arn:aws:sns:us-east-1:201814457761:webSiteScrapper'
//             //       };  
//             //       let publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(msgParams).promise();
//             //       publishTextPromise.then(
//             //         function(data) {
//             //           console.log(`Message ${msgParams.Message} sent to the topic ${msgParams.TopicArn}`);
//             //           console.log(data);
//             //         }).catch(
//             //           function(err) {
//             //           console.error(err, err.stack);
//             //         });                                                
//             // }
//   // ################ This is sending SNS Topic End #############
//           //console.log('Content from corePriceDisplay_desktop_feature_div:', corePriceDisplayContent);
//         } else {
//           console.error('Failed to retrieve the page. Status code:', response.status);
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error.message);
//       });
  }
  
  // Set an interval (e.g., every 5 minutes)
//   const interval = 5 * 60 * 1000; // 5 minutes in milliseconds
// const interval = 5 * 1000; // 5 minutes in milliseconds
//   setInterval(scrapeContent, interval);
  
  // Initial scraping
  //scrapeContent();



// ---------------------

// import http from 'http';
// import { readFile } from 'fs/promises';
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const server = http.createServer(async (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');    
//     // Handling requests
//     const filePath = req.url === '/' ? 'index.html' : req.url.substring(1);
//     const fileFullPath = join(__dirname, filePath);
//     console.log(fileFullPath);

//     try {
//         const data = await readFile(fileFullPath);
//         // Determine the content type based on file extension
//         const ext = fileFullPath.slice(((fileFullPath.lastIndexOf(".") - 1) >>> 0) + 2);
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(data);
//     } catch (err) {
//         console.log(err);
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('404 Not Found');
//     }
// });

// const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });