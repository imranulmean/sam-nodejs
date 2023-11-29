import axios from 'axios';
import cheerio from 'cheerio';
import AWS from 'aws-sdk';

const param={
    region: process.env.region,
    // accesskey:process.env.accesskey,
    // secretAccessKey:process.env.secretAccessKey

}

AWS.config.update(param);
const sqsAmazon = new AWS.SQS({apiVersion: '2012-11-05'});
const queueUrl=process.env.queueUrl;


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
       
       sqsAmazon.receiveMessage(params, function(err, data) {
         if (err) {
           console.log("Receive Error", err);
         } else if (data.Messages) {
             console.log(`Message Lenght:${data.Messages.length}`);
             for(let m of data.Messages){
                  console.log(`deleteing Message Id: ${m.Body}`)
                 sqsDeleteMessage(m.ReceiptHandle).then(res=>{
                     console.log(res);
                 });
             }
         }
       });
}

const sqsDeleteMessage= async (receiptHandle) =>{
    var deleteParams = {
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle
      };
      sqsAmazon.deleteMessage(deleteParams, function(err, data) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message Deleted", data);
        }
      });    
      
}

await sqsReceiveMessage();