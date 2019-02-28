# product-gallery
A component replica of an Amazon Product Page's top product summary and gallery section.
Front End Component adapted from https://github.com/amazonians-110/product-gallery-summary

## API References

### CREATE
####For **seller** to create a new listing.

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

Response code: 201

Response data:
```js
{
  unique_id: 1,
  name: 'Amazon Product 1',
}
```

Error: 404

### READ
For **buyer** to see basic product information
