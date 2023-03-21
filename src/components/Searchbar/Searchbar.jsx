import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './SearchBar.module.css';
import { BsSearch } from 'react-icons/bs';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleCange = e => {
    this.setState({ searchQuery: e.currentTarget.value.trim().toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log(this.state.searchQuery);

    if (this.state.searchQuery === '') {
      return;
    }

    this.props.onSubmit(this.state);

    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className="SearchForm-button-label">
              <BsSearch />
            </span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            value={this.state.searchQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleCange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
