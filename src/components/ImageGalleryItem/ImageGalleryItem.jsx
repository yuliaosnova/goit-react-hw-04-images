import PropTypes from 'prop-types';
import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url }) => {
  return <img className={css.ImageGalleryItemImage} src={url} alt="" loading="lazy" />;
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
