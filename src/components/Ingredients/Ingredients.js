import React, { useReducer, useState, useCallback } from 'react';

import ErrorModal from '../UI/ErrorModal';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error('Should not get there');
  }
};
const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);

  // const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients });
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
        // setIngredients((prevIngredients) => {
        //   return [...prevIngredients, { id: responseData.name, ...ingredient }];
        // });
        dispatch({
          type: 'ADD',
          ingredient: { id: responseData.name, ...ingredient },
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
    )
      .then((response) => {
        setIsLoading(false);
        // setIngredients((prevIngredients) =>
        //   prevIngredients.filter(
        //     (ingredient) => ingredient.id !== ingredientId,
        //   ),
        // );
        dispatch({ type: 'DELETE', id: ingredientId });
      })
      .catch((error) => {
        setIsLoading(false);
        setError('Something went wrong');
      });
  };
  const clearError = () => {
    setError(null);
  };
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
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
