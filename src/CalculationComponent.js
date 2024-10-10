import React from 'react';

const CalculationComponent = ({ data }) => {
  // Sample calculation: Sum of the selected service values
  const calculateTotal = () => {
    const sum = Object.values(data).reduce((acc, value) => acc + value, 0);
    return sum;
  };

  return (
    <div>
      <h2>Calculations</h2>
      <p><strong>Total:</strong> {calculateTotal()}</p>

      {/* Add more calculations based on your formulas */}
    </div>
  );
};

export default CalculationComponent;
