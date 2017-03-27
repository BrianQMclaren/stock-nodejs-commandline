const http = require('http');
const https = require('https');
const api = require('./api.json');

// Print out stock details
function printMessage(price) {
  const message = `Today's current apple share is ${price}.`;
  console.log(message);
}

function printError(error) {
  console.log(error.message);
}

function get(price) {
  try {
    const request = http.get(`http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22AAPL%22)&env=store://datatables.org/alltableswithkeys&format=json`,

      response => {
          if (response.statusCode === 200) {
              let body = "";
              // Read the data
              response.on('data', chunk => {
                  body += chunk;
              });

              response.on('end', () => {
                  try {
                      // Parse the data
                      const stock = JSON.parse(body);
                      // Check if the stocks was found before printing
                        if (stock) {
                          // Print the data
                          printMessage(stock.query.results.quote.Ask);
                      } else {
                          const queryError = new Error(`The stock market crashed!!!`);
                          printError(queryError);
                      }
                  } catch (error) {
                      // Parse Error
                      printError(error);
                  }
              });
          } else {
              // Status Code Error
              const statusCodeError = new Error(`There was an error. (${http.STATUS_CODES[response.statusCode]})`);
              printError(statusCodeError);
          }

      });

      request.on("error", printError);
  } catch (error) {
      //Malformed URL Error
      printError(error);
  }
}

module.exports.get = get;
