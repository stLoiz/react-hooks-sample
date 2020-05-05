import React, { useState, useEffect, useRef } from 'react';

import useHttp from '../../hooks/http';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import './Search.css';

const Search = React.memo((props) => {
  const [filterState, setFilterState] = useState('');
  const { onLoadIngredients } = props;
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
      for (const key in data) {
        loadIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
        onLoadIngredients(loadIngredients);
      }
    }
  }, [data, isLoading, error, onLoadIngredients]);
  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading..</span>}
          <input
            ref={inputRef}
            type="text"
            value={filterState}
            onChange={(event) => setFilterState(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
