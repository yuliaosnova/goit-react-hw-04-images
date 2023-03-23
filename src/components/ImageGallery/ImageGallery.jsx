import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import css from './ImageGallery.module.css';

export default function ImageGallery({ pictures, clickHandler }) {
  return (
    <ul className={css.ImageGallery}>
      {pictures.map(picture => (
        <li
          key={picture.id}
          onClick={() => clickHandler(picture.id)}
          className={css.ImageGalleryItem}
        >
          <ImageGalleryItem url={picture.webformatURL} />
        </li>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
