import PropTypes from 'prop-types';
import React, { useState } from 'react';
import css from './SearchBar.module.css';
import { BsSearch } from 'react-icons/bs';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('query:', searchQuery);

    if (searchQuery === '') {
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className="SearchForm-button-label">
            <BsSearch />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};