const fs = require('fs');

const {
  generateName,
  generateCategory,
  generateManufacturer,
  generateRandomCount,
  generateRandomBoolean,
  generateDescription,
  generateImage,
} = require('../seedingHelperFunctions');

function makeAll(writer, callback) {
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

      const values = `${i}|${generateName(i)}|${generateCategory(i)}|${generateManufacturer(i)}|[${[generateImage(), generateImage()]}]|${reviews.join('|')}|${generateRandomCount()}|${generateRandomCount()}|${generateRandomBoolean()}|${generateDescription()}\n`;
      i += 1;
      if (i === 10) {
        writer.write(values, () => callback('success'));
      } else {
        ok = writer.write(values);
      }
    } while (i <= 10 && ok);
    if (i <= 10) {
      writer.once('drain', write);
    }
  }
}

const writer = fs.createWriteStream('../cassandra.csv');

makeAll(writer, string => console.log(string));
