module.exports = {
  createTableQueries: `
    DROP TABLE IF EXISTS products;

    CREATE TABLE "products" (
      id int,
      name text,
      category text,
      manufacturer text,
      images list<text>,
      review_one_star_count int, 
      review_two_star_count int, 
      review_three_star_count int, 
      review_four_star_count int,
      review_five_star_count int,
      review_count int,
      question_count int,
      price int,
      is_prime boolean,
      description text,
      PRIMARY KEY (id)
    );
  `,
};
