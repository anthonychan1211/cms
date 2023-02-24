import { useEffect, useState } from "react";
import {
  NewEntry,
  DeleteCollection,
  StyledDocument,
  StyledDocumentSection,
} from "./styles";
import { extractHeader, handleDeleteCollection } from "../../util/handlers";
import AddNewDocumentModal from "./AddNewDocumentModal";
import AddNewHeaderModal from "./AddNewHeaderModal";
import EditModal from "./EditModal";
import EditHeaderModal from "./EditHeaderModal";
import DeleteCollectionWarning from "./DeleteCollectionWarning";

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
        headerKey.findIndex((el) => headerObj[el] === "UniqueID"),
        1
      );
      headerKey.unshift(id[0]);
    }
  }
  // set column number
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--column-number",
      headerKey.length.toString()
    );
  });

  const [editModal, setEditModal] = useState("");
  const [addModal, setAddModal] = useState<string>("");
  const [editHeaderModal, setEditHeaderModal] = useState("");
  const [deleteCollectionWarning, setDeleteCollectionWarning] = useState(false);
  const mappedHeader = headerKey.map((el: string) => {
    return (
      <th key={el} className="header">
        {el}
      </th>
    );
  });

  const mappedValues =
    documents.length > 0 &&
    documents.map((item: { [key: string]: any }, i: number) => {
      // item = each document
      if (documents) {
        return (
          <tr
            className="row"
            key={i}
            onClick={(e) => {
              setEditModal(
                e.currentTarget.firstElementChild?.innerHTML as string
              );
            }}
          >
            {headerKey.map((el: string) => {
              if (!headerObj[el]) {
                return;
              } else if (headerObj[el] === "Image(s)") {
                if (item[el]) {
                  if (item[el].length <= 9) {
                    return (
                      <td key={item[el]} style={{ minWidth: "300px" }}>
                        <div className="collage">
                          {item[el].map((image: string, i: number) => {
                            return <img key={i} src={image} alt={image} />;
                          })}
                        </div>
                      </td>
                    );
                  } else {
                    const cutVersion = item[el].slice(0, 8);
                    return (
                      <td style={{ minWidth: "300px" }}>
                        <div className="collage">
                          {cutVersion.map((image: string, i: number) => (
                            <img key={i} src={image} alt={image}></img>
                          ))}
                          <p style={{ alignSelf: "center" }}>...and more</p>
                        </div>
                      </td>
                    );
                  }
                } else {
                  return <td></td>;
                }
              } else if (headerObj[el] === "Image URL(s)") {
                return (
                  <td style={{ minWidth: "300px" }}>
                    <div className="collage">
                      {item[el]?.map((image: string, i: number) => {
                        return <img key={i} src={image} alt={image} />;
                      })}
                    </div>
                  </td>
                );
              } else {
                return (
                  <td
                    className={headerObj[el] === "TextArea" ? "text-area" : ""}
                  >
                    {item[el]?.length > 300
                      ? `${item[el]?.substring(0, 300)}...`
                      : item[el]}
                  </td>
                );
              }
            })}
          </tr>
        );
      }
    });

  function handleChangeHeader() {
    setEditHeaderModal(collectionName);
  }
  return (
    <StyledDocumentSection>
      {collectionName && (
        <div>
          <DeleteCollection onClick={() => setDeleteCollectionWarning(true)}>
            Delete Collection
          </DeleteCollection>
          {mappedHeader.length > 0 ? (
            <>
              <NewEntry
                onClick={() => {
                  setAddModal("entry");
                }}
              >
                + Add New Entry
              </NewEntry>
              <NewEntry onClick={handleChangeHeader}>Edit Header</NewEntry>
            </>
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

      <h1 className="document-collection-name">{collectionName}</h1>

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
      {editHeaderModal !== "" && (
        <EditHeaderModal
          setEditHeaderModal={setEditHeaderModal}
          collectionName={collectionName}
          userDB={userDB}
        />
      )}
      {deleteCollectionWarning && (
        <DeleteCollectionWarning
          setDeleteCollectionWarning={setDeleteCollectionWarning}
          userDB={userDB}
          collectionName={collectionName}
        />
      )}
    </StyledDocumentSection>
  );
};

export default DocumentSection;
