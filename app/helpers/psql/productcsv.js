// const concat = require('concat-files');
const fs = require('fs');

const {
  generateName,
  generateCategory,
  generateManufacturer,
  generateRandomCount,
  generateRandomBoolean,
  generateDescription,
} = require('../seedingHelperFunctions');

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

function makeProducts(writer, callback) {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      const values = `${i},${generateName(i)},${generateCategory(i)},${generateManufacturer(i)},${generateRandomCount()},${generateRandomCount()},${generateRandomBoolean()},${generateDescription()}\n`;
      i--;
      if (i === 0) {
        writer.write(values, () => callback('success'));
      } else {
        ok = writer.write(values);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

const writer = fs.createWriteStream('./product.csv');

makeProducts(writer, string => console.log(string));
