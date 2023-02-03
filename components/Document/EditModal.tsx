import { StyledEditModal } from "./styles";
import { MouseEvent, useEffect, useState } from "react";
import {
  handleDeleteDocument,
  handleImagePreview,
  uploadImage,
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
  const [editMode, setEditMode] = useState(false);
  const chosenDoc = Array.from(documents).filter((el: any) => {
    return el[`${collectionName}_id`] === clickedDoc;
  });
  const [finalVersionDoc, setFinalVersionDoc] = useState(null);
  useEffect(() => {
    setChosenDocument(chosenDoc[0]);
  }, []);
  useEffect(() => {
    console.log(finalVersionDoc);
  }, [finalVersionDoc]);
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
    if (el.includes("_id")) {
      return (
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
  async function handleEdit() {
    const entries = Object.entries(chosenDocument);
    entries.forEach(async (el) => {
      if (Array.isArray(el[1])) {
        const uploaded = await uploadImage(el[1]);
        setChosenDocument({
          ...chosenDocument,
          [chosenDocument[el[0]]]: uploaded,
        });
      }
    });
  }
  async function updateDocument() {
    const res = await fetch("api/updateDocument", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        collectionName,
        userDB,
        chosenDocument,
      }),
    });
    const feedBack = await res.json();
    if (res.status === 200) {
      console.log(feedBack.message);
      setLoading(false);
      window.location.reload();
    } else {
      console.log("error");
    }
  }

  return (
    <StyledEditModal>
      <div className="inner-modal">
        <div className="control-panel">
          <button
            className="cancel-button"
            onClick={() => setEditMode(!editMode)}
          >
            Edit : {editMode ? "On" : "Off"}
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
        <h4>Edit</h4>
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
            Cancel
          </button>
          {editMode && (
            <button
              onClick={async () => {
                handleEdit();
                updateDocument();
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
