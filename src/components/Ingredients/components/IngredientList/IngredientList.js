import PropTypes from 'prop-types';
import React from 'react';

import './IngredientList.css';

const IngredientList = ({ ingredients, onRemoveItem }) => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {ingredients.map((ig) => (
          <li key={ig.id}>
            <span>{ig.title}</span>
            <span>{ig.amount}</span>
            <button type="button" onClick={onRemoveItem.bind(this, ig.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

IngredientList.propTypes = {
  /*
   * an array of ingredients object
   */
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      amount: PropTypes.string,
    }),
  ).isRequired,

  /*
   * a function which removes ingredients
   */
  onRemoveItem: PropTypes.func.isRequired,
};
export default IngredientList;
