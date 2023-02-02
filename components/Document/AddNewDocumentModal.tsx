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
  const [newDocument, setNewDocument] = useState<React.SetStateAction<any>>({
    [`${collectionName}_id`]: "",
  });
  const [newIdNumber, setNewIdNumber] = useState(1);
  useEffect(() => {
    if (documents.length > 0) {
      documents.forEach((el: { [x: string]: string }) => {
        const number = parseInt(el[`${collectionName}_id`].split("_")[1]);
        if (number >= newIdNumber) {
          setNewIdNumber(number + 1);
        }
      });
    }
  }, []);
  useEffect(() => {
    const newId = (
      document.getElementById(`${collectionName}_id`) as HTMLInputElement
    )?.value;
    setNewDocument({ ...newDocument, [`${collectionName}_id`]: newId });
  }, [newIdNumber]);

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
    if (el.includes("_id")) {
      return (
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder={el}
            value={`${collectionName}_${newIdNumber
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
          <p>{el}</p>
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
            onClick={(e) =>
              handleSubmitAddDocument(e, newDocument, collectionName, userDB)
            }
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
