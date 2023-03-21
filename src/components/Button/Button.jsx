import PropTypes from 'prop-types';
import React from 'react';
import css from './Button.module.css';

const Button = ({ buttonClick }) => {
  return (
	<button type="button" className={css.Button} onClick={buttonClick}>Load more</button>
  );
};

Button.propTypes = {
	buttonClick: PropTypes.func.isRequired,
	
};

export default Button;
