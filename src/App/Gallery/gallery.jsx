/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './gallery.style';
import GalleryImage from './Gallery-Image/Gallery-Image';
import GalleryPicker from './Gallery-Picker/Gallery-Picker';


export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImg: props.images[0],
    };

    this.handleImageHover = this.handleImageHover.bind(this);
  }

  // eslint-disable-next-line consistent-return
  static getDerivedStateFromProps(props, currentState) {
    if (!props.images.includes(currentState.currentImg)) {
      return {
        currentImg: props.images[0],
      };
    }
  }

  handleImageHover(event) {
    const selectedImageId = event.target.id.split('-')[1];
    const images = document.querySelectorAll('img.pickerImage');
    images.forEach((image) => {
      if (image.id.split('-')[1] === selectedImageId) {
        this.setState({
          currentImg: image.src,
        });
      }
      image.classList.toggle('selected', image.id.split('-')[1] === selectedImageId);
    });
  }

  render() {
    const { currentImg } = this.state;
    const { images, secondary } = this.props;
    if (images.length === 1) {
      images.push(secondary);
    }
    return (
      <Container>
        <GalleryPicker
          images={images}
          handleImageHover={this.handleImageHover}
        />
        <GalleryImage key={currentImg} image={currentImg} />
      </Container>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  secondary: PropTypes.string.isRequired,
};
