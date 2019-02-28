# product-gallery
A component replica of an Amazon Product Page's top product summary and gallery section.
Front End Component adapted from https://github.com/amazonians-110/product-gallery-summary

## API References

### CREATE
#### For seller to create a new product listing.

```js
POST /api/product/:unique_id
```

Request body:
```js
{
  id: 1,
  unique_id: 1,
  problem_section: "Images",
  issue: "Is not clear",
  comments: "complaint"
}
```

Response code: 201 (Created)

Response data:
```js
{
  unique_id: 1,
}
```

Error: 400

#### For buyer to report incorrect product listing.

```js
POST /api/product
```

Request body:
```js
{
  id: 1,
  unique_id: 1,
  name: 'Amazon Product 1',
  category: 'electronics',
  manufacturer: 'Murazik and Sons',
  primary_image: 'https://s3.us-east-2.amazonaws.com/product-summary-component/electronics1.jpg',
  review_one_star_count: 624,
  review_two_star_count: 639,
  review_three_star_count: 622,
  review_four_star_count: 275,
  review_five_star_count: 251,
  review_count: 2411,
  question_count: 216,
  price: 561,
  total_price: 571,
  stock: 5,
  is_prime: true,
  description: 'string',
}
```

Response code: 201 (Created)

Response data:
```js
{
  unique_id: 1,
  name: 'Amazon Product 1',
}
```

Error: 400

### READ
#### For buyer to see basic product information.

```js
GET /api/product/:unique_id
```

Request body:
```js
{
  unique_id: 1,
}
```

Response code: 200 (OK)

Response data:
```js
{
  name: 'Amazon Product 1',
  category: 'electronics',
  manufacturer: 'Murazik and Sons',
  primary_image: 'https://s3.us-east-2.amazonaws.com/product-summary-component/electronics1.jpg',
  review_one_star_count: 624,
  review_two_star_count: 639,
  review_three_star_count: 622,
  review_four_star_count: 275,
  review_five_star_count: 251,
  review_count: 2411,
  question_count: 216,
  price: 561,
  total_price: 571,
  stock: 5,
  is_prime: true,
  description: 'string',
}
```

Error: 404

#### For buyer to see a Seller page information.

```js
GET /api/product/:unique_id
```

Request body:
```js
{
  seller_id: 1,
}
```

Response code: 200 (OK)

Response data:
```js
{
  seller_name: 'Amazon Seller 1',
  seller_products: [
    {product: 'product1'},
    {product: 'product2'},
    {product: 'product3'},
  ]
}
```

Error: 404

#### For buyer to see other sellers selling the product.

```js
GET /api/product/:id
```

Request body:
```js
{
  id: 1,
}
```

Response code: 200 (OK)

Response data:
```js
{
  [
    {seller_id: 1, price: 23},
    {seller_id: 2, price: 25},
    {seller_id: 3, price: 20}
  ]
}
```

Error: 404

### UPDATE
#### For seller to update a product lsting.

```js
PUT /api/product/:id
```

Request body:
```js
{
  name: 'Amazon Product 1',
  category: 'electronics',
  manufacturer: 'Murazik and Sons',
  primary_image: 'https://s3.us-east-2.amazonaws.com/product-summary-component/electronics1.jpg',
  review_one_star_count: 624,
  review_two_star_count: 639,
  review_three_star_count: 622,
  review_four_star_count: 275,
  review_five_star_count: 251,
  review_count: 2411,
  question_count: 216,
  price: 561,
  total_price: 571,
  stock: 5,
  is_prime: true,
  description: 'string',
}
```

Response code: 200 (OK)

Response data: N/A

Error: 400

### DELETE
#### For seller to delete a product lsting.

```js
DELETE /api/product/:id
```

Response body:
```js
{
  id: 1,
}
```

Response code: 200 (OK)

Response data: N/A

Error: 400