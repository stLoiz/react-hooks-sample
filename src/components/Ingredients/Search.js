import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const [filterState, setFilterState] = useState('');
  const { onLoadIngredients } = props;
  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (filterState === inputRef.current.value) {
        const query =
          filterState.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${filterState}"`;
        fetch(`${process.env.REACT_APP_FIREBASE_URL}ingredients.json${query}`)
          .then((response) => {
            return response.json();
          })
          .then((responseData) => {
            const loadIngredients = [];
            for (const key in responseData) {
              loadIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadIngredients(loadIngredients);
          });
      }
    }, 500);
  }, [filterState, onLoadIngredients, inputRef]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
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
