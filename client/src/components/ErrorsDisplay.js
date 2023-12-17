import React from 'react';

const ErrorsDisplay = ({ errors }) => {
  return (
    <div>
      {errors.length ? (
        <div>
          <h2>Error</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default ErrorsDisplay;