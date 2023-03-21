import React, { Component } from 'react';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import * as API from '../servises/api';

class App extends Component {
  state = {
    query: '',
    pictures: [],
    isLoading: false,
    page: 1,
    showModal: false,
    currentPicture: '',
  };

  onSearch = async ({ searchQuery }) => {
    if (this.state.query !== searchQuery) {
      this.setState({ pictures: [], page: 1 });
    }

    await this.setState({ query: searchQuery });

    try {
      this.setState({ isLoading: true });

      const photos = await API.fetchPictures(this.state.query, this.state.page);
      if (photos.hits.length === 0) {
        alert('no matching results');
      }

      // Array.prototype.push.apply(this.state.pictures, photos.hits);

      this.setState(state => ({
        pictures: [...this.state.pictures, ...photos.hits],
        isLoading: false,
        page: (this.state.page += 1),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  onBtnClick = async () => {
    try {
      this.setState({ isLoading: true });

      const photos = await API.fetchPictures(this.state.query, this.state.page);
      if (photos.hits.length === 0) {
        alert('no more pictures');
      }

		//ЩО СТОСУЄТЬСЯ setState, push ніколи не використовується. Цей метод мутує масив.
      // Array.prototype.push.apply(this.state.pictures, photos.hits);
      this.setState(state => ({
        pictures: [...this.state.pictures, ...photos.hits],
        isLoading: false,
        page: (this.state.page += 1),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  getModalPicture = id => {
    console.log(id);

    this.setState(({ currentPicture }) => ({
      currentPicture: this.state.pictures.filter(picture => picture.id === id),
    }));

    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { pictures, isLoading, showModal, currentPicture } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSearch} />
        {pictures.length > 0 && (
          <ImageGallery
            pictures={pictures}
            clickHandler={this.getModalPicture}
            // showModal={showModal}
          />
        )}
        {isLoading && (
          <div className={css.spinner}>
            <ThreeDots color="#835d9b" />
          </div>
        )}
        {pictures.length > 0 && <Button buttonClick={this.onBtnClick} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={currentPicture[0].largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
