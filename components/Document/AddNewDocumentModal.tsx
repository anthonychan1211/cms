import React, { useEffect, useState } from "react";
import { AddEntry } from "./styles";
import {
  handleImagePreview,
  handleSubmitAddDocument,
} from "../../util/handlers";
import { deleteButton } from "../../util/button";

const AddNewDocumentModal = ({
  headerKey,
  collectionName,
  documents,
  headerObj,
  setAddModal,
  userDB,
}: {
  headerKey: string[];
  collectionName: string;
  documents: [];
  headerObj: any;
  userDB: string;
  setAddModal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [newDocument, setNewDocument] = useState<React.SetStateAction<any>>({});
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleDeleteImage(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const imageDiv = (e.target as HTMLButtonElement).closest(
      ".image"
    ) as HTMLElement;
    const removeItem = imageDiv.querySelector("a")?.href;
    const propertyName: string = imageDiv.parentElement?.parentElement
      ?.id as string;
    const filteredArr = newDocument[propertyName].filter(
      (el: string) => el != removeItem
    );

    setNewDocument({ ...newDocument, [propertyName]: filteredArr });
  }
  const mappedAddNewDocumentForm = headerKey.map((el: string) => {
    // create ID
    if (headerObj[el] === "UniqueID") {
      return (
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder={el}
            onChange={(e) => {
              documents.forEach((doc) => {
                if (doc[el] === e.target.value) {
                  setWarning(true);
                } else {
                  setWarning(false);
                }
              });

              setNewDocument({
                ...newDocument,
                [e.target.name]: e.target.value,
              });
            }}
            name={el}
            id={el}
          />
          <label htmlFor={el} className="form__label">
            {el}
          </label>
          {warning && (
            <p style={{ color: "red", fontSize: "12px" }}>
              This ID has been used.
            </p>
          )}
        </div>
      );
    } else if (Array.isArray(headerObj[el])) {
      // if the type is select and the value is an array
      if (!Object.hasOwn(newDocument, el))
        setNewDocument({
          ...newDocument,
          [el]: headerObj[el][0],
        });

      return (
        <>
          <label style={{ fontSize: "18px" }}>{el}: </label>
          <select
            defaultValue={headerObj[el][0]}
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
    } else if (headerObj[el] === "TextArea") {
      return (
        <div className="form__group field">
          <textarea
            rows={10}
            style={{ marginTop: "10px" }}
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
    } else if (headerObj[el] === "Image(s)") {
      return (
        <div id={el}>
          <p className="title">{el}</p>
          <input
            type="file"
            name={el}
            multiple
            accept=".gif,.jpg,.jpeg,.png"
            onChange={(e) => {
              handleImagePreview(e, newDocument, setNewDocument);
            }}
          />
          <div className="gallery-grid ">
            {newDocument[el] &&
              newDocument[el].map((image: string) => {
                return (
                  <div className="image">
                    <div
                      className="delete-image"
                      onClick={(e) => handleDeleteImage(e)}
                    >
                      {deleteButton}
                    </div>
                    <a href={image} target="_blank" rel="noopener noreferrer">
                      <img src={image} style={{ margin: "5px" }} />
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
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
            onWheel={(e) => {
              if (headerObj[el].toLowerCase() === "number")
                (e.target as HTMLElement).blur();
            }}
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
  return (
    <AddEntry>
      <div className="inner-modal">
        <h4>Add New Document</h4>
        <div className="input-section">{mappedAddNewDocumentForm}</div>
        {loading && (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        <div className="submit-section">
          <button
            className="cancel-button"
            onClick={() => {
              setAddModal("");
              setLoading(false);
            }}
          >
            Cancel
          </button>
          {warning ? (
            <button type="submit" disabled className="cancel-button">
              Submit
            </button>
          ) : (
            <button
              type="submit"
              onClick={(e) => {
                handleSubmitAddDocument(
                  e,
                  newDocument,
                  collectionName,
                  userDB,
                  setLoading
                );
                setLoading(true);
              }}
              className="add-button"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </AddEntry>
  );
};

export default AddNewDocumentModal;
