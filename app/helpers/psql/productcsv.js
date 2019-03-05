const fs = require('fs');

const {
  generateName,
  generateCategory,
  generateManufacturer,
  generateRandomCount,
  generateRandomBoolean,
  generateDescription,
} = require('../seedingHelperFunctions');

function makeProducts(writer, callback) {
  let i = 1;
  write();
  function write() {
    let ok = true;
    do {
      const reviews = [];
      for (let j = 0; j < 5; j += 1) {
        reviews.push(generateRandomCount());
      }
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      reviews.push(reviews.reduce(reducer));

      const values = `${generateName(i)}|${generateCategory(i)}|${generateManufacturer(i)}|${reviews.join('|')}|${generateRandomCount()}|${generateRandomCount()}|${generateRandomBoolean()}|${generateDescription() + i}\n`;
      i += 1;
      if (i === 10000000) {
        writer.write(values, () => callback('success'));
      } else {
        ok = writer.write(values);
      }
    } while (i <= 10000000 && ok);
    if (i <= 10000000) {
      writer.once('drain', write);
    }
  }
}

const writer = fs.createWriteStream('../products.csv');

makeProducts(writer, string => console.log(string));


// alternative data generation script, 10M is too many to seed using this script though
// function makeProducts() {
//   for (let i = 0; i <= 10000000; i += 1) {
//     const values = [
//       i,
//       generateName(i),
//       generateCategory(i),
//       generateManufacturer(i),
//       generateRandomCount(),
//       generateRandomCount(),
//       generateRandomBoolean(),
//       generateDescription(),
//     ];
//     console.log(values.join('|'));
//   }
// }
