import PropTypes from 'prop-types';
import React from 'react';

import './Card.css';

const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

Card.propTypes = {
  /*
   * any node elements
   */
  children: PropTypes.node.isRequired,
};
export default Card;
