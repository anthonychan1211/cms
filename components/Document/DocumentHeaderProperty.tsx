import React, { useState } from "react";
import { deleteButton } from "../../util/button";
const DocumentHeaderProperty = () => {
  const types = ["Text", "TextArea", "Number", "Select", "Date", "Image(s)"];
  const [value, setValue] = useState(types[0]);
  const [choice, setChoice] = useState<unknown[]>([
    <input type="text" className="choices" required />,
    <input type="text" className="choices" required />,
  ]);

  const type = types.map((el) => <option value={el}>{el}</option>);

  return (
    <div className="property-box">
      <div className="form__group field">
        <input
          type="text"
          className="form__field propertyName"
          placeholder="value"
          name="value"
          id="value"
          required
        />
        <label htmlFor="value" className="form__label">
          Property Name
        </label>
      </div>

      <select onChange={(e) => setValue(e.target.value)} className="valueType">
        {type}
      </select>

      <button onClick={(e) => e.currentTarget.parentElement?.remove()}>
        {deleteButton}
      </button>
      {value === "Select" && (
        <div className="add-choices">
          <p>Options</p>
          {choice}
          <button
            onClick={() =>
              setChoice([
                ...choice,
                <input type="text" className="choices" required />,
              ])
            }
          >
            + Option
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentHeaderProperty;
