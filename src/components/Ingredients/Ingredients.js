import React, { useReducer, useCallback, useMemo, useEffect } from 'react';

import useHttp from '../../hooks/http';
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
  const { isLoading, error, data, sendRequest, reqExtra } = useHttp();

  useEffect(() => {
    dispatch({ type: 'DELETE', id: reqExtra });
  }, [data, reqExtra]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback((ingredient) => {
    // setIsLoading(true);
    // dispatchHttp({ type: 'SEND' });
    fetch(process.env.REACT_APP_FIREBASE_URL + 'ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // setIsLoading(false);
        // dispatchHttp({ type: 'RESPONSE' });
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
  }, []);
  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `${process.env.REACT_APP_FIREBASE_URL}ingredients/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
      );
    },
    [sendRequest],
  );
  const clearError = useCallback(() => {
    // dispatchHttp({ type: 'CLEAR' });
  }, []);

  const ingredientsList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [ingredients, removeIngredientHandler]);
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientsList}
      </section>
    </div>
  );
};

export default Ingredients;
