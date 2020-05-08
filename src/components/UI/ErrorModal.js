import PropTypes from 'prop-types';
import React from 'react';

import './ErrorModal.css';

const ErrorModal = React.memo(({ onClose, children }) => {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="backdrop" onKeyDown={onClose} onClick={onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
});

ErrorModal.propTypes = {
  /*
   * any node elements
   */
  children: PropTypes.node.isRequired,

  /*
   * function which closes the modal
   */
  onClose: PropTypes.func.isRequired,
};
export default ErrorModal;
