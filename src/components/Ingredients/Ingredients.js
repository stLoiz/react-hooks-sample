import React, { useReducer, useCallback, useMemo } from 'react';

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

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...currentHttpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...currentHttpState, error: null };
    default:
      throw new Error('Should not be reached');
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  // const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback((ingredient) => {
    // setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch(process.env.REACT_APP_FIREBASE_URL + 'ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // setIsLoading(false);
        dispatchHttp({ type: 'RESPONSE' });
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
  const removeIngredientHandler = useCallback((ingredientId) => {
    // setIsLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch(
      `${process.env.REACT_APP_FIREBASE_URL}ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      },
    )
      .then((response) => {
        // setIsLoading(false);
        // setIngredients((prevIngredients) =>
        //   prevIngredients.filter(
        //     (ingredient) => ingredient.id !== ingredientId,
        //   ),
        // );
        dispatchHttp({ type: 'RESPONSE' });
        dispatch({ type: 'DELETE', id: ingredientId });
      })
      .catch((error) => {
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong' });
        // setIsLoading(false);
        // setError('Something went wrong');
      });
  }, []);
  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' });
  };
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
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientsList}
      </section>
    </div>
  );
};

export default Ingredients;
