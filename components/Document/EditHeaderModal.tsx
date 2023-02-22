import React, { ReactComponentElement, useEffect, useState } from "react";
import { editHeader, getHeader } from "../../util/fetcher";
import DocumentHeaderProperty from "./DocumentHeaderProperty";
import { StyledHeaderForm } from "./styles";
import { deleteButton } from "../../util/button";
import { handleAddHeaderForm } from "../../util/handlers";
const EditHeaderModal = ({
  setEditHeaderModal,
  collectionName,
  userDB,
}: {
  setEditHeaderModal: React.Dispatch<React.SetStateAction<string>>;
  collectionName: string;
  userDB: string;
}) => {
  const [propertyCount, setPropertyCount] = useState<unknown[]>([]);
  const [header, setHeader] = useState<unknown>();
  const types = [
    "Unique ID",
    "Text",
    "TextArea",
    "Number",
    "Select",
    "Date",
    "Image(s)",
    "Image URL(s)",
  ];
  const type = types.map((el) => <option value={el}>{el}</option>);
  useEffect(() => {
    async function fetchHeader() {
      const headerObj = await getHeader(collectionName, userDB);
      const { Collection, _id, ...filtered } = headerObj;

      const mappedHeaderField = Object.entries(filtered)?.map(
        ([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <>
                <div className="property-box">
                  <div className="form__group field">
                    <input
                      type="text"
                      className="form__field propertyName"
                      placeholder={key}
                      name={key}
                      id={key}
                      defaultValue={key}
                    />
                    <label htmlFor={key} className="form__label">
                      Property Name
                    </label>
                  </div>

                  <select className="valueType" value="Select" disabled>
                    <option>Select</option>
                  </select>

                  <button onClick={(e) => handleDeleteProperty(e)}>
                    {deleteButton}
                  </button>
                  {Array.isArray(value) && (
                    <div className="add-choices">
                      <p>Options</p>
                      {value.map((el) => (
                        <input
                          type="text"
                          className="choices"
                          required
                          defaultValue={el}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="property-box">
                  <div className="form__group field">
                    <input
                      type="text"
                      className="form__field propertyName"
                      placeholder={key}
                      name={key}
                      id={key}
                      defaultValue={key}
                    />
                    <label htmlFor={key} className="form__label">
                      Property Name
                    </label>
                  </div>

                  <select
                    className="valueType"
                    value={value as string}
                    disabled
                  >
                    {type}
                  </select>

                  <button onClick={(e) => handleDeleteProperty(e)}>
                    {deleteButton}
                  </button>
                </div>
                {Array.isArray(value) && (
                  <div className="add-choices">
                    <p>Options</p>
                    {value.map((el) => (
                      <input
                        type="text"
                        className="choices"
                        required
                        value={el}
                      />
                    ))}
                  </div>
                )}
              </>
            );
          }
        }
      );

      setHeader(mappedHeaderField);
    }
    fetchHeader();
  }, []);
  async function handleEditHeaderSubmit(e: { preventDefault: any }) {
    e.preventDefault();
    const newHeader = await handleAddHeaderForm(e, collectionName);
    await editHeader(newHeader, userDB, collectionName);
    window.location.reload();
  }
  function handleDeleteProperty(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.currentTarget.parentElement?.remove();
  }
  return (
    <StyledHeaderForm>
      <div className="inner-modal">
        <h4>Edit Header</h4>
        <div className="input-section">
          {header}
          {propertyCount}
          <button
            type="button"
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
              setEditHeaderModal("");
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleEditHeaderSubmit}
            className="add-button"
          >
            Submit
          </button>
        </div>
      </div>
    </StyledHeaderForm>
  );
};

export default EditHeaderModal;
