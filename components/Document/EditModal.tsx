import { StyledEditModal } from "./styles";
import { MouseEvent, useEffect, useState } from "react";
import {
  handleDeleteDocument,
  handleEdit,
  handleImagePreview,
} from "../../util/handlers";
import { deleteButton } from "../../util/button";
const EditModal = ({
  documents,
  collectionName,
  clickedDoc,
  headerObj,
  headerKey,
  setEditModal,
  userDB,
}: {
  [key: string]: any;
  collectionName: string;
  clickedDoc: string;
  headerObj: any;
  headerKey: string[];
  setEditModal: React.Dispatch<React.SetStateAction<string>>;
  userDB: string;
}) => {
  const [chosenDocument, setChosenDocument] = useState<
    React.SetStateAction<any>
  >({
    [`${collectionName}_id`]: "",
  });
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const chosenDoc = Array.from(documents).filter((el: any) => {
    return el[`${collectionName}_id`] === clickedDoc;
  });
  // set the chosen document after clicked
  useEffect(() => {
    setChosenDocument(chosenDoc[0]);
  }, []);

  function handleDeleteImage(e: MouseEvent) {
    const imageDiv = (e.target as HTMLButtonElement).closest(
      ".image"
    ) as HTMLElement;
    const removeItem = imageDiv.querySelector("a")?.href;
    const propertyName: string = imageDiv.parentElement?.parentElement
      ?.id as string;
    const filteredArr = chosenDocument[propertyName].filter(
      (el: string) => el != removeItem
    );

    setChosenDocument({ ...chosenDocument, [propertyName]: filteredArr });
  }
  const mappedChosenDocumentForm = headerKey.map((el: string) => {
    // ID
    if (headerObj[el] === "UniqueID") {
      return editMode ? (
        <>
          <div className="form__group field">
            <input
              type="text"
              className="form__field"
              placeholder={el}
              onChange={(e) => {
                documents.forEach((doc: { [key: string]: string }) => {
                  if (doc[el] === e.target.value) {
                    setWarning(true);
                  } else {
                    setWarning(false);
                  }
                });

                setChosenDocument({
                  ...chosenDocument,
                  [e.target.name]: e.target.value,
                });
              }}
              value={chosenDocument[el]}
              id={el}
              name={el}
            />
            <label htmlFor={el} className="form__label">
              {el}
            </label>
          </div>
          {warning && (
            <p style={{ color: "red", fontSize: "12px" }}>
              This ID has been used.
            </p>
          )}
        </>
      ) : (
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder={el}
            value={chosenDocument[el]}
            id={el}
            disabled
          />
          <label htmlFor={el} className="form__label">
            {el}
          </label>
        </div>
      );
    }
    // if the type is select and the value is an array
    else if (Array.isArray(headerObj[el])) {
      if (!Object.hasOwn(headerObj, el))
        setChosenDocument({
          ...chosenDocument,
          [el]: headerObj[el][0],
        });

      return (
        <>
          <label style={{ fontSize: "18px" }}>{el}: </label>
          <select
            disabled={!editMode}
            defaultValue={headerObj[el][0]}
            style={{
              fontSize: "15px",
              padding: "5px",
              margin: "10px",
              marginTop: "30px",
            }}
            name={el}
            onChange={(e) => {
              setChosenDocument({
                ...chosenDocument,
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
            disabled={!editMode}
            rows={10}
            style={{ marginTop: "10px" }}
            className="form__field"
            placeholder={el}
            name={el}
            id={el}
            onChange={(e) => {
              setChosenDocument({
                ...chosenDocument,
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
          {editMode && (
            <input
              type="file"
              name={el}
              multiple
              accept=".gif,.jpg,.jpeg,.png"
              onChange={(e) => {
                handleImagePreview(e, chosenDocument, setChosenDocument);
              }}
            />
          )}
          <div className="gallery-grid">
            {chosenDocument[el] &&
              chosenDocument[el].map((image: string) => {
                return (
                  <div className="image">
                    {editMode && (
                      <div
                        className="delete-image"
                        onClick={(e) => handleDeleteImage(e)}
                      >
                        {deleteButton}
                      </div>
                    )}
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
            disabled={!editMode}
            type={headerObj[el].toLowerCase()}
            className="form__field"
            placeholder={el}
            value={chosenDocument[el]}
            name={el}
            id={el}
            onWheel={(e) => {
              if (headerObj[el].toLowerCase() === "number")
                (e.target as HTMLElement).blur();
            }}
            onChange={(e) => {
              setChosenDocument({
                ...chosenDocument,
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
    <StyledEditModal>
      <div className="inner-modal">
        <div className="control-panel">
          <button
            className={editMode ? "edit-mode-on" : "cancel-button"}
            onClick={() => setEditMode(!editMode)}
          >
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() =>
              handleDeleteDocument(userDB, collectionName, chosenDocument)
            }
          >
            Delete Document
          </button>
        </div>
        <h4>{editMode ? "Edit" : "Preview"}</h4>
        <div className="input-section">{mappedChosenDocumentForm}</div>
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
              setEditModal("");
              setLoading(false);
            }}
          >
            {editMode ? "Cancel" : "Close"}
          </button>
          {editMode && (
            <button
              onClick={async () => {
                setLoading(true);
                handleEdit(chosenDocument, collectionName, userDB, setLoading);
              }}
              type="submit"
              className="add-button"
            >
              Save changes
            </button>
          )}
        </div>
      </div>
    </StyledEditModal>
  );
};

export default EditModal;
