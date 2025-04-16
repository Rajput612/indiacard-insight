
import React from "react";

const SpendingFormHeader = () => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-navy mb-2">Add Your Spending Details</h2>
      <p className="text-gray-600">
        Add each spending category individually. You can add as many as you like to see personalized recommendations.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        All fields marked with tooltips provide additional information to help you fill them accurately.
      </p>
    </div>
  );
};

export default SpendingFormHeader;
