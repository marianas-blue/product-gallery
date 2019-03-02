const fs = require('fs');

const {
  generateRandomCount,
} = require('../seedingHelperFunctions');

function makeReviews(writer, callback) {
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
      reviews.push(i);

      const values = `${reviews.join(',')}\n`;
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

const writer = fs.createWriteStream('../review.csv');

makeReviews(writer, string => console.log(string));
