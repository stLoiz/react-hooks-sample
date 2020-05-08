import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

import useHttp from '../../../../hooks/http';
import Card from '../../../UI/Card';
import ErrorModal from '../../../UI/ErrorModal';
import './Search.css';

const Search = React.memo(({ onLoadIngredients }) => {
  const [filterState, setFilterState] = useState('');

  const inputRef = useRef();
  const { isLoading, error, sendRequest, data, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterState === inputRef.current.value) {
        const query =
          filterState.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${filterState}"`;

        sendRequest(
          `${process.env.REACT_APP_FIREBASE_URL}ingredients.json${query}`,
          'GET',
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filterState, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadIngredients = [];
      Object.keys(data).forEach((key) => {
        loadIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
        onLoadIngredients(loadIngredients);
      });
    }
  }, [data, isLoading, error, onLoadIngredients]);
  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label htmlFor="search">
            Filter by Title
            {isLoading && <span>Loading..</span>}
            <input
              ref={inputRef}
              type="text"
              id="search"
              value={filterState}
              onChange={(event) => setFilterState(event.target.value)}
            />
          </label>
        </div>
      </Card>
    </section>
  );
});
Search.propTypes = {
  /*
   * function that loads filtered ingredients
   */
  onLoadIngredients: PropTypes.func.isRequired,
};
export default Search;
