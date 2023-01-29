import React, { useEffect, useState } from "react";
import { AddEntry } from "./styles";
import { handleImagePreview } from "../../util/handlers";
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
  const [imageSrc, setImageSrc] = useState<React.SetStateAction<any>>();
  const [uploadData, setUploadData] = useState();
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
            value={`${collectionName}_${(documents.length + 1)
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
    } else if (headerObj[el] === "Image") {
      console.log(newDocument);
      return (
        <>
          <p>{el}</p>
          <input
            type="file"
            name={el}
            onChange={(e) => {
              handleImagePreview(
                e,
                setImageSrc,
                setUploadData,
                newDocument,
                setNewDocument
              );
            }}
          />

          {newDocument[el] && <img src={newDocument[el].image} />}
        </>
      );
    } else if (headerObj[el] === "Multiple Images") {
      return (
        <>
          <p>{el}</p>
          <input
            type="file"
            name={el}
            multiple
            onChange={(e) => {
              handleImagePreview(
                e,
                setImageSrc,
                setUploadData,
                newDocument,
                setNewDocument
              );
            }}
          />
          {newDocument[el] &&
            newDocument[el].image.map((image: string) => {
              return <img src={image} style={{ margin: "5px" }} />;
            })}
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

  async function handleSubmitAddDocument(e: { preventDefault: () => void }) {
    e.preventDefault();
    const entries = Object.entries(newDocument);
    entries.forEach(async (el: any) => {
      if (typeof el[1] === "object") {
        if (typeof el[1].image === "string") {
          const data = new FormData();
          data.append("file", el[1].image);
          data.append("upload_preset", "qygeysbp");
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/doeejabc9/image/upload",
            {
              method: "POST",
              body: data,
            }
          );
          const file = await res.json();
          el.splice(1, 1, file.secure_url);
          handleAddDocumentAPIFetch(
            Object.fromEntries(entries),
            collectionName,
            userDB
          );
        } else if (Array.isArray(el[1].image)) {
          let arr: string[] = [];
          for (let i = 0; i < el[1].image.length; i++) {
            const data = new FormData();
            data.append("file", el[1].image[i]);
            data.append("upload_preset", "qygeysbp");
            const res = await fetch(
              "https://api.cloudinary.com/v1_1/doeejabc9/image/upload",
              {
                method: "POST",
                body: data,
              }
            );
            const file = await res.json();
            arr.push(file.secure_url);
          }
          el.splice(1, 1, arr);
          handleAddDocumentAPIFetch(
            Object.fromEntries(entries),
            collectionName,
            userDB
          );
        }
      }
    });
  }
  async function handleAddDocumentAPIFetch(
    newDoc: {},
    collectionName: string,
    userDB: string
  ) {
    console.log(newDoc);
    const addDocumentFeedBack = await fetch("api/addDocument", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ newDoc, collectionName, userDB }),
    });
    const feedBack = await addDocumentFeedBack.json();
    console.log(feedBack.status);
    if (addDocumentFeedBack.status === 400) {
      console.log("Error on add new document");
    }
    if (addDocumentFeedBack.status === 200) {
      console.log(feedBack.message);
      window.location.reload();
    }
  }
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
            onClick={handleSubmitAddDocument}
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
