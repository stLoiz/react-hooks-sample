import React, { useState, useCallback } from 'react';

import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_FIREBASE_URL + 'ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        setIsLoading(false);

        //it will return the response with an automatically generated unique id
        return response.json();
      })
      .then((responseData) => {
        setIngredients((prevIngredients) => {
          return [...prevIngredients, { id: responseData.name, ...ingredient }];
        });
      });
  };
  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_FIREBASE_URL}ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      },
    ).then((response) => {
      setIsLoading(false);
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== ingredientId),
      );
    });
  };
  return (
    <div className="App">
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
