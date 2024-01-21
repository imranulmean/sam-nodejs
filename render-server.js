import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://geeks-blog.onrender.com/';
let count=0;

async function webSpider() {     
    const pageHTML = await axios.get(url);
    const $ = cheerio.load(pageHTML.data);     
    count++;
    console.log(`Calling Count:${count}`)
    let h1Text = $("h1").text();
    console.log(h1Text);
} 

webSpider();

setInterval(()=>{
    webSpider();
},60000*10);
