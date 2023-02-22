import React, { useState, ChangeEvent } from "react";
import { addHeader } from "../../util/fetcher";
import { handleAddHeaderForm } from "../../util/handlers";
import DocumentHeaderProperty from "./DocumentHeaderProperty";
import { StyledHeaderForm } from "./styles";

const AddNewHeaderModal = ({
  collectionName,
  userDB,
  setAddModal,
}: {
  collectionName: string;
  userDB: string;
  setAddModal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [propertyCount, setPropertyCount] = useState<unknown[]>([
    <div className="property-box">
      <div className="form__group field">
        <input
          type="text"
          className="form__field propertyName"
          placeholder={`${collectionName}_id`}
          name={`${collectionName}_id`}
          id={`${collectionName}_id`}
          defaultValue={`${collectionName}_id`}
        />
        <label htmlFor={`${collectionName}_id`} className="form__label">
          Property Name
        </label>
      </div>

      <div>
        <select className="valueType" disabled>
          <option value="UniqueID">UniqueID</option>
        </select>
      </div>
    </div>,
    <p style={{ fontSize: "12px" }}>
      This can be set as any property e.g. Name/Email. But it must be unique.
    </p>,
  ]);
  async function handleAddHeader(e: { preventDefault: () => void }) {
    e.preventDefault();
    const newHeader = await handleAddHeaderForm(e, collectionName);
    addHeader(newHeader, userDB);
    setAddModal("");
    window.location.reload();
  }

  return (
    <StyledHeaderForm>
      <form className="inner-modal">
        <h4>Add New Header</h4>
        <div className="input-section">
          {propertyCount}
          <button
            className="add-button"
            onClick={() =>
              setPropertyCount(() => [
                ...propertyCount,
                <DocumentHeaderProperty />,
              ])
            }
          >
            + Add Property
          </button>
        </div>
        <div className="submit-section">
          <button
            className="cancel-button"
            onClick={() => {
              setAddModal("");
              setPropertyCount([]);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleAddHeader}
            className="add-button"
          >
            Submit
          </button>
        </div>
      </form>
    </StyledHeaderForm>
  );
};

export default AddNewHeaderModal;
