import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const submitHandler = (event) => {
    event.preventDefault();
    // ...
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
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
