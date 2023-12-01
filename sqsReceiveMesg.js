import axios from 'axios';
import cheerio from 'cheerio';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const productURLs= new Set();
const param={
    region: process.env.region,
    // accesskey:process.env.accesskey,
    // secretAccessKey:process.env.secretAccessKey
}

AWS.config.update(param);
const sqsAmazon = new AWS.SQS({apiVersion: '2012-11-05'});
const queueUrl=process.env.queueUrl;

export const handler = async (event,context) =>{
   await sqsReceiveMessage();
  }

const sqsReceiveMessage = async () =>{
    let params = {
        // AttributeNames: [
        //    "SentTimestamp"
        // ],
        MaxNumberOfMessages: 10,
        //MessageAttributeNames: [
       //    "All"
       // ],
        QueueUrl: queueUrl,
      //  VisibilityTimeout: 20,
       // WaitTimeSeconds: 0
       };


       try {
        const receivedMessages = await sqsAmazon.receiveMessage(params).promise();

        if (receivedMessages.Messages) {
            console.log(`Message Length: ${receivedMessages.Messages.length}`);
            for (let m of receivedMessages.Messages) {
               // console.log(`Deleting Message Id: ${m.Body}`);
                 // now go to the Main URL and Get the All products Link, Name and Price and make an object and store them in productURLs
                 getProductsUrl(m.Body);                
                // after storing the urls delete that message from the sqs queue
                await sqsDeleteMessage(m.ReceiptHandle);
            }
        }
        // now show the products urls from the variable named productURLs
              console.log([...productURLs]);
    } catch (err) {
        console.error("Receive Error", err);
    }
}

const sqsDeleteMessage= async (receiptHandle) =>{
    var deleteParams = {
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle
      };
      try {
        const deletedMessage= await sqsAmazon.deleteMessage(deleteParams).promise();
          console.log("Message Deleted", deletedMessage);
      } catch (error) {
          console.log(error);
      }   
      
}

const getProductsUrl = async (pUrl) =>{
  // console.log(pUrl);
  const pageHtml = await axios.get(pUrl);
  const $ = cheerio.load(pageHtml.data);
  // showing all the products in the page and storing in the productURLs
  $("li.product").each((index, element) => {   
    
    const productLink = $(element).find("a.woocommerce-LoopProduct-link");
    const productUrl=productLink.attr("href")
    const title = productLink.find("h2.woocommerce-loop-product__title").text();
    const priceElement = productLink.find("span.price span.woocommerce-Price-amount.amount");
    const price = priceElement.text().trim();
    let productObj={productUrl, title, price};
    productURLs.add(productObj); 
  });  
}
// await handler();
