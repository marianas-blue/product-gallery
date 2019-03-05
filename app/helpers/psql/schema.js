module.exports = {
  createTableQueries: `
    DROP TABLE IF EXISTS products, images, reviews;

    CREATE TABLE "products" (
      "id" SERIAL PRIMARY KEY,
      "name" varchar(100),
      "category" varchar,
      "manufacturer" varchar,
      review_one_star_count int, 
      review_two_star_count int, 
      review_three_star_count int, 
      review_four_star_count int,
      review_five_star_count int,
      "review_count" int,
      "question_count" int,
      "price" int,
      "is_prime" boolean,
      "description" varchar(1000)
    );
    
    CREATE TABLE "images" (
      "id" SERIAL PRIMARY KEY,
      "link" varchar,
      "product_id" int REFERENCES products(id)
    );
  `,
};
