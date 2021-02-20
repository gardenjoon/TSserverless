import { Handler, Context } from "aws-lambda";

const axios = require("axios");
const cheerio = require("cheerio");

const stockprice: Handler = async (event: any, context: Context) => {
  let ticker = event.body
  let url = `https://finance.yahoo.com/quote/${ticker}`;
  let stock = await axios.get(url).then(function(html:any) {
    let $ = cheerio.load(html.data);
    let stockitem = (tag:string,num:string) => ($('div#quote-header-info').find(`${tag}[data-reactid=${num}]`).text());
    let stockinfo:object = {
      time : /\d[A-z0-9:\ ]*/.exec(stockitem('span','35'))![0],
      stock : /.*\./.exec(stockitem('h1','7'))![0],
      price : stockitem('span','32')!
      }
    return stockinfo
  }).catch(function(error:any) {
    console.log(error)
  })
  const response = {
    statusCode: 200,
    body: JSON.stringify(stock)
  };
  return response
};

export { stockprice };