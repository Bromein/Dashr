import React, { useState, useContext } from "react";
import { mapIndexToMonth } from "../../utils/helpers";
import { CTX } from "../../context/Store";
import { StyledBudgetForm } from "./AddBudgetForm.styles";
const AddBudgetForm = ({ userId }) => {
  const [value, setValue] = useState(0);
  const { setBudget } = useContext(CTX);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    const sendData = {
      id: userId,
      budget: value
    };
    fetch("/api/profile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sendData)
    })
      .then(res => res.json())
      .then(data => setBudget(data[0]));
  };
  return (
    <StyledBudgetForm>
      <h1>{mapIndexToMonth()}'s Budget</h1>
      <input type="number" onChange={handleChange} />
      <button onClick={handleSubmit}>submit</button>
    </StyledBudgetForm>
  );
};
export default AddBudgetForm;
