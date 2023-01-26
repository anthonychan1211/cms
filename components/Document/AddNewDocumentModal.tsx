import React, { useEffect, useState } from "react";
import { AddEntry } from "./styles";

const AddNewDocumentModal = ({
  headerKey,
  collectionName,
  values,
  headerObj,
  setAddModal,
}: {
  headerKey: string[];
  collectionName: string;
  values: string[];
  headerObj: any;
  setAddModal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [newDocument, setNewDocument] = useState({
    [`${collectionName}_id`]: "",
  });
  useEffect(() => {
    const id = document.getElementById(
      `${collectionName}_id`
    ) as HTMLInputElement;
    setNewDocument({ ...newDocument, [`${collectionName}_id`]: id.value });
  }, []);
  const mappedAddNewDocumentForm = headerKey.map((el: string) => {
    // create ID
    if (el.includes("_id")) {
      return (
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder={el}
            value={`${collectionName}_${(values.length + 1)
              .toString()
              .padStart(3, "0")}`}
            name={newDocument[el]}
            id={el}
            disabled
          />
          <label htmlFor={el} className="form__label">
            {el}
          </label>
        </div>
      );
    } else if (Array.isArray(headerObj[el])) {
      // if the type is select and the value is an array
      return (
        <>
          <label style={{ fontSize: "18px" }}>{el}: </label>
          <select
            style={{
              fontSize: "15px",
              padding: "5px",
              margin: "10px",
              marginTop: "30px",
            }}
            name={el}
            onChange={(e) => {
              setNewDocument({
                ...newDocument,
                [e.target.name]: e.target.value,
              });
            }}
          >
            {headerObj[el].map((option: string) => (
              <option>{option}</option>
            ))}
          </select>
        </>
      );
    } else {
      return (
        <div className="form__group field">
          <input
            type={headerObj[el].toLowerCase()}
            className="form__field"
            placeholder={el}
            name={el}
            id={el}
            onChange={(e) => {
              setNewDocument({
                ...newDocument,
                [e.target.name]: e.target.value,
              });
            }}
            required
          />
          <label htmlFor={el} className="form__label">
            {el}
          </label>
        </div>
      );
    }
  });
  function handleAddDocument(e: { preventDefault: () => void }) {
    e.preventDefault();
  }
  console.log(newDocument);
  return (
    <AddEntry>
      <div className="inner-modal">
        <h4>Add New Document</h4>
        <div className="input-section">{mappedAddNewDocumentForm}</div>
        <div className="submit-section">
          <button
            className="cancel-button"
            onClick={() => {
              setAddModal("");
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleAddDocument}
            className="add-button"
          >
            Submit
          </button>
        </div>
      </div>
    </AddEntry>
  );
};

export default AddNewDocumentModal;
