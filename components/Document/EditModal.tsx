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
  >({});
  const [loading, setLoading] = useState(false);
  const [imageURLInput, setImageURLInput] = useState(0);
  const [newImageURL, setNewImageURL] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [editMode, setEditMode] = useState(false);
  const key = headerKey.filter((el) => headerObj[el] === "UniqueID");

  const chosenDoc = Array.from(documents).filter((el: any) => {
    return el[key[0]] === clickedDoc;
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
    if (headerObj[el] === "UniqueID") {
      // ID
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
      if (chosenDocument[el])
        return (
          <div id={el}>
            <p className="title">{el}</p>
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
              {chosenDocument[el].map((image: string) => {
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
    } else if (headerObj[el] === "Image URL(s)") {
      if (chosenDocument[el]) {
        const exsitingInputField = chosenDocument[el].map(
          (image: string, i: number) => {
            return (
              <div className="imageURLGrid">
                <div className="form__group field">
                  <input
                    disabled={!editMode}
                    type="url"
                    className="form__field"
                    name={el}
                    value={image}
                    onChange={(e) => {
                      if (chosenDocument[el]) {
                        if (i == chosenDocument[el].length) {
                          setChosenDocument({
                            ...chosenDocument,
                            [el]: [...chosenDocument[el], e.target.value],
                          });
                        } else {
                          chosenDocument[el].splice(i, 1, e.target.value);
                          setChosenDocument({
                            ...chosenDocument,
                            [el]: chosenDocument[el],
                          });
                        }
                      } else {
                        console.log("no length");

                        setChosenDocument({
                          ...chosenDocument,
                          [el]: [e.target.value],
                        });
                      }
                    }}
                  />
                  <label htmlFor={el} className="form__label">
                    Image URL
                  </label>
                </div>

                <div className="image">
                  <a
                    href={image && image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={image && image} style={{ margin: "5px" }} />
                  </a>
                </div>
                {editMode && (
                  <div
                    className="delete-image"
                    onClick={(e) => {
                      const imageDiv = (e.target as HTMLButtonElement).closest(
                        ".imageURLGrid"
                      ) as HTMLElement;
                      console.log(imageDiv);
                      const filtered = chosenDocument[el].filter(
                        (deleteImage: string) => {
                          return (
                            deleteImage !==
                            ((
                              imageDiv.querySelector(
                                "input"
                              ) as HTMLInputElement
                            ).value as string)
                          );
                        }
                      );
                      setChosenDocument({
                        ...chosenDocument,
                        [el]: filtered,
                      });
                      // imageDiv.style.display = "none";
                    }}
                  >
                    {deleteButton}
                  </div>
                )}
              </div>
            );
          }
        );
        let inputField = [];
        for (let i = 0; i < imageURLInput; i++) {
          inputField.push(
            <div className="imageURLGrid">
              <div className="form__group field">
                <input
                  type="url"
                  className="form__field"
                  placeholder="Image URL"
                  name={el}
                  id={`new_${el}${i}`}
                  onChange={(e) => {
                    if (newImageURL[el]) {
                      if (i == newImageURL[el].length) {
                        setNewImageURL({
                          ...newImageURL,
                          [el]: [...newImageURL[el], e.target.value],
                        });
                      } else {
                        newImageURL[el][i] = e.target.value;
                        setNewImageURL({
                          ...newImageURL,
                          [el]: [...newImageURL[el]],
                        });
                      }
                    } else {
                      console.log("no length");
                      setNewImageURL({ [el]: [e.target.value] });
                    }
                  }}
                  required
                />
                <label htmlFor={el} className="form__label">
                  Image URL
                </label>
              </div>

              <div className="image">
                <a
                  href={
                    newImageURL[el] &&
                    (
                      document.getElementById(
                        `new_${el}${i}`
                      ) as HTMLInputElement
                    )?.value
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={
                      newImageURL[el] &&
                      (
                        document.getElementById(
                          `new_${el}${i}`
                        ) as HTMLInputElement
                      )?.value
                    }
                    style={{ margin: "5px" }}
                  />
                </a>
              </div>

              <div
                className="delete-image"
                onClick={(e) => {
                  const imageDiv = (e.target as HTMLButtonElement).closest(
                    ".imageURLGrid"
                  ) as HTMLElement;
                  const filtered = newImageURL[el].filter(
                    (deleteImage: string) => {
                      return (
                        deleteImage !==
                        ((imageDiv.querySelector("input") as HTMLInputElement)
                          .value as string)
                      );
                    }
                  );
                  setNewImageURL({
                    ...newImageURL,
                    [el]: filtered,
                  });
                  imageDiv.remove();
                }}
              >
                {deleteButton}
              </div>
            </div>
          );
        }
        return (
          <div id={el}>
            <p className="title">{el}</p>
            {exsitingInputField}
            {editMode && (
              <div>
                {inputField}
                <button onClick={() => setImageURLInput(imageURLInput + 1)}>
                  Add URL
                </button>
              </div>
            )}
          </div>
        );
      }
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
  console.log(newImageURL, chosenDocument);
  return (
    <StyledEditModal
      onSubmit={() => {
        setLoading(true);
        if (Object.keys(newImageURL).length > 0) {
          let result: { [key: string]: string[] | string } = {};
          for (const el in newImageURL) {
            result = {
              ...chosenDocument,
              [el]: [...chosenDocument[el], ...newImageURL[el]],
            };
          }
          handleEdit(result, collectionName, userDB, key[0], setLoading);
          return;
        } else {
          handleEdit(
            chosenDocument,
            collectionName,
            userDB,
            key[0],
            setLoading
          );
        }
      }}
    >
      <div className="inner-modal">
        <div className="control-panel">
          <button
            type="button"
            className={editMode ? "edit-mode-on" : "cancel-button"}
            onClick={() => setEditMode(!editMode)}
          >
            Edit
          </button>
          <button
            type="button"
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
            type="button"
            className="cancel-button"
            onClick={() => {
              setEditModal("");
              setLoading(false);
            }}
          >
            {editMode ? "Cancel" : "Close"}
          </button>
          {editMode && (
            <button type="submit" className="add-button">
              Save changes
            </button>
          )}
        </div>
      </div>
    </StyledEditModal>
  );
};

export default EditModal;
