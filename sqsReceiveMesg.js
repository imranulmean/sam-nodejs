import axios from 'axios';
import cheerio from 'cheerio';
import AWS from 'aws-sdk';


const param={
    region: 'us-east-1',
    accesskey:'AKIAS57IUHWQZT3UWYNS',
    secretAccessKey:'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'

}
AWS.config.update(param);
const sqsAmazon = new AWS.SQS({apiVersion: '2012-11-05'});
const queueUrl="https://sqs.us-east-1.amazonaws.com/201814457761/webSpiderQueue";


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