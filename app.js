const stock = require('./stock');
//Join multiple values passed as arguments and replace all spaces with underscores
const price = process.argv.slice(2);
//
// price.forEach(stock .get);
stock.get(price);
