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
  generateImage: () => faker.image.image(),
  generateRandomCount: () => faker.random.number(1000),
  generateRandomBoolean: () => faker.random.boolean(),
  generateDescription: () => ("Lorem ipsum dolor amet you probably haven't heard of product "),
};
