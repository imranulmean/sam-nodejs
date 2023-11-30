import axios from 'axios';
import cheerio from 'cheerio';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

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
                console.log(`Deleting Message Id: ${m.Body}`);
                  await sqsDeleteMessage(m.ReceiptHandle);
            }
        }
    } catch (err) {
        console.error("Receive Error", err);
    }       

      //  sqsAmazon.receiveMessage(params, function(err, data) {
      //    if (err) {
      //      console.log("Receive Error", err);
      //    } else if (data.Messages) {
      //        console.log(`Message Lenght:${data.Messages.length}`);
      //        for(let m of data.Messages){
      //             console.log(`deleteing Message Id: ${m.Body}`)
      //            sqsDeleteMessage(m.ReceiptHandle).then(res=>{
      //                console.log(res);
      //            });
      //        }
      //    }
      //  });
}

const sqsDeleteMessage= async (receiptHandle) =>{
    var deleteParams = {
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle
      };
      // sqsAmazon.deleteMessage(deleteParams, function(err, data) {
      //   if (err) {
      //     console.log("Delete Error", err);
      //   } else {
      //     console.log("Message Deleted", data);
      //   }
      // }); 
      try {
        const deletedMessage= await sqsAmazon.deleteMessage(deleteParams).promise();
          console.log("Message Deleted", deletedMessage);
      } catch (error) {
          console.log(error);
      }   
      
}

//await sqsReceiveMessage();