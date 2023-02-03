import { useEffect, useState } from "react";
import { NewEntry, DeleteCollection, StyledDocument } from "./styles";
import { extractHeader, handleDeleteCollection } from "../../util/handlers";
import AddNewDocumentModal from "./AddNewDocumentModal";
import AddNewHeaderModal from "./AddNewHeaderModal";
import EditModal from "./EditModal";

interface DocumentType {
  headerObj: any;
  documents: any;
  collectionName: string;
  userDB: string;
}

const DocumentSection = ({
  headerObj = {},
  documents = [],
  collectionName,
  userDB,
}: DocumentType) => {
  // extract header and put id at first
  const headerKey = extractHeader(headerObj);

  if (headerKey[0]) {
    if (!headerKey[0].includes("_id")) {
      const id = headerKey.splice(
        headerKey.findIndex((el) => el.includes("_id")),
        1
      );
      headerKey.unshift(id[0]);
    }
  }
  // set column number
  useEffect(() => {
    const root = document.querySelector(":root") as HTMLElement;
    root.style.setProperty("--column-number", `${headerKey.length}`);
  });

  const [editModal, setEditModal] = useState("");
  const [addModal, setAddModal] = useState<string>("");
  const mappedHeader = headerKey.map((el: string) => {
    return <th className="header">{el}</th>;
  });
  const mappedValues =
    documents.length > 0 &&
    documents.map((item: { [key: string]: any }) => {
      if (item) {
        return (
          <tr
            className="row"
            onClick={(e) =>
              setEditModal(
                e.currentTarget.firstElementChild?.innerHTML as string
              )
            }
          >
            {headerKey.map((el: string) => {
              if (headerObj[el] === "Image(s)") {
                if (item[el]) {
                  if (item[el].length <= 9) {
                    return (
                      <td>
                        <div className="collage">
                          {item[el].map((image: string) => (
                            <img
                              style={{ maxHeight: " 100px" }}
                              src={image}
                              alt={image}
                            ></img>
                          ))}
                        </div>
                      </td>
                    );
                  } else {
                    const cutVersion = item[el].slice(0, 8);
                    return (
                      <td>
                        <div className="gallery-grid">
                          {cutVersion.map((image: string) => (
                            <img
                              style={{ maxHeight: " 100px" }}
                              src={image}
                              alt={image}
                            ></img>
                          ))}
                          <p style={{ alignSelf: "center" }}>...and more</p>
                        </div>
                      </td>
                    );
                  }
                }
              }
              return <td>{item[el]?.replace(/(.{200})..+/, "$1...")}</td>;
            })}
          </tr>
        );
      }
    });

  return (
    <div style={{ maxHeight: "90%" }}>
      {collectionName && (
        <div>
          <DeleteCollection
            onClick={() =>
              handleDeleteCollection(userDB as string, collectionName as string)
            }
          >
            Delete Collection
          </DeleteCollection>
          {mappedHeader.length > 0 ? (
            <NewEntry
              onClick={() => {
                setAddModal("entry");
              }}
            >
              + Add New Entry
            </NewEntry>
          ) : (
            <NewEntry
              onClick={() => {
                setAddModal("header");
              }}
            >
              + Add Header
            </NewEntry>
          )}
        </div>
      )}

      <h1
        style={{ marginLeft: "90px", fontSize: "35px" }}
        className="document-collection-name"
      >
        {collectionName}
      </h1>

      <StyledDocument>
        <thead>
          <tr>{mappedHeader}</tr>
        </thead>
        <tbody>{mappedValues}</tbody>
      </StyledDocument>

      {addModal === "header" && (
        <AddNewHeaderModal
          collectionName={collectionName}
          userDB={userDB}
          setAddModal={setAddModal}
        />
      )}
      {addModal === "entry" && (
        <AddNewDocumentModal
          userDB={userDB}
          headerKey={headerKey}
          collectionName={collectionName}
          documents={documents}
          headerObj={headerObj}
          setAddModal={setAddModal}
        />
      )}
      {editModal !== "" && (
        <EditModal
          clickedDoc={editModal}
          documents={documents}
          collectionName={collectionName}
          headerObj={headerObj}
          headerKey={headerKey}
          setEditModal={setEditModal}
          userDB={userDB}
        />
      )}
    </div>
  );
};

export default DocumentSection;
