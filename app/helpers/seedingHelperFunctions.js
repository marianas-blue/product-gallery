const faker = require('faker');

module.exports = {
  generateName: number => `Product ${number}`,
  generateCategory: (number) => {
    const categoryArr = [
      'electronics',
      'beauty',
      'outdoor',
      'wearables',
      'bath',
      'clothing',
      'board games',
      'food',
      'toys',
      'jewelery',
    ];
    return categoryArr[number % 10];
  },
  generateManufacturer: () => faker.company.companyName(),
  generateImage: (category, number) => `https://s3.us-east-2.amazonaws.com/product-summary-component/${category}${number}.jpg`,
  generateRandomCount: () => faker.random.number(1000),
  generateRandomBoolean: () => faker.random.boolean(),
  generateDescription: () => ("Lorem ipsum dolor amet you probably haven't heard of them ennui raclette VHS irony tumeric pop-up lumbersexual palo santo truffaut yr scenester. Letterpress flannel kitsch lumbersexual, brooklyn chia keffiyeh subway tile everyday carry seitan fam schlitz glossier. Shoreditch franzen tumeric, deep v YOLO bespoke meh. Vaporware knausgaard subway tile pop-up green juice next level, food truck la croix artisan leggings portland occupy truffaut."),
};
