import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Card from '../../../UI/Card';
import LoadingIndicator from '../../../UI/LoadingIndicator';

import './IngredientForm.css';

const IngredientForm = React.memo(({ onAddIngredient, isLoading }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputAmount, setInputAmount] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    onAddIngredient({ title: inputTitle, amount: inputAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">
              Name
              <input
                type="text"
                id="title"
                value={inputTitle}
                onChange={(event) => {
                  setInputTitle(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount
              <input
                type="number"
                id="amount"
                value={inputAmount}
                onChange={(event) => {
                  setInputAmount(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {isLoading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

IngredientForm.propTypes = {
  /*
   * function to store the ingredient
   */
  onAddIngredient: PropTypes.func.isRequired,

  /*
   * bool to show the LoadingIndicator if true
   */
  isLoading: PropTypes.bool.isRequired,
};
export default IngredientForm;
