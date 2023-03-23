import React, { useEffect, useState } from 'react';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import * as API from '../servises/api';

export default function App() {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentPicture, setCurrentPicture] = useState('');

  const changeQuery = searchQuery => {
    if (query !== searchQuery) {
      setPictures([]);
      setPage(1);
      setQuery(searchQuery);
    }
  };

  useEffect(() => {
    if (query === '') {
      return; //перший рендер
    }

    setIsLoading(true);
    API.fetchPictures(query, page)
      .then(photos => {
        if (photos.hits.length === 0) {
          alert('no matching results');
        }

        setPictures(pictures => [...pictures, ...photos.hits]);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [query, page]);

  const getModalPicture = id => {
    console.log('id', id);

    setCurrentPicture(() => pictures.filter(picture => picture.id === id));

    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(() => !showModal);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={changeQuery} />
      {pictures.length > 0 && (
        <ImageGallery
          pictures={pictures}
          clickHandler={getModalPicture}
        />
      )}
      {isLoading && (
        <div className={css.spinner}>
          <ThreeDots color="#835d9b" />
        </div>
      )}
      {pictures.length > 0 && (
        <Button buttonClick={() => setPage(page => page + 1)} />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={currentPicture[0].largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
}