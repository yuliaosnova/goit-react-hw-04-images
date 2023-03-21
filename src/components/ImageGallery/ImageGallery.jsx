import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    pictureId: '',
  };

  render() {
    const arr = this.props.pictures;

    return (
      <ul className={css.ImageGallery}>
        {arr.map(picture => (
          <li
            key={picture.id}
            onClick={() => this.props.clickHandler(picture.id)}
            className={css.ImageGalleryItem}
          >
            <ImageGalleryItem url={picture.webformatURL} />
          </li>
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  //   showModal: PropTypes.bool.isRequired,
};

export default ImageGallery;
