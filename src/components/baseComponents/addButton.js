import React from "react";

const AddButton = ({ onClick }) => {
  return (
    <button type="button" className="addButton" onClick={onClick}>
      +
    </button>
  );
};
export default AddButton;
