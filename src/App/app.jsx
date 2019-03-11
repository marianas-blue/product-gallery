/* eslint-env browser */
/* eslint-disable import/extensions */
import React from 'react';
import Axios from 'axios';

import Summary from './Summary/summary.jsx';
import Gallery from './Gallery/gallery.jsx';
import CategoryBreadcrumb from './Category-Breadcrumb/category-breadcrumb.jsx';
import { ColContainer, RowContainer } from './app.style';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
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
      },
    };
  }

  componentDidMount() {
    const id = document.URL.split('/')[document.URL.split('/').length - 1];
    const product = JSON.parse(localStorage.getItem(id));
    if (product !== null) {
      this.setState({
        product,
      });
    } else {
      // let origin = '';
      // if (window.location.host.startsWith('localhost')) {
      //   origin = 'http://localhost';
      // }
      Axios.get(`/api/products/${id}`)
        .then(({ data }) => {
          localStorage.setItem(id, JSON.stringify(data));
          this.setState({
            product: data,
          });
        });
    }
  }

  render() {
    const { product } = this.state;
    return (
      <ColContainer>
        <CategoryBreadcrumb
          category={product.category}
        />
        <RowContainer>
          <Gallery images={[product.primary_image]} secondary={product.secondary_image} />
          <Summary
            product={product}
          />
        </RowContainer>
      </ColContainer>
    );
  }
}
