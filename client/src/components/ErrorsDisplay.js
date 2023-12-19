import React from 'react';

const ErrorsDisplay = ({ errors }) => {
  return (
    <div className="validation-errors">
      <h2>Validation Errors</h2>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorsDisplay;