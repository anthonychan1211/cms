import { useEffect, useState } from "react";
import { NewEntry, DeleteCollection, StyledDocument } from "./styles";

import { extractHeader, handleDeleteCollection } from "../../util/handlers";
import AddNewDocumentModal from "./AddNewDocumentModal";
import AddNewHeaderModal from "./AddNewHeaderModal";

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
  // extract header
  const headerKey = extractHeader(headerObj);

  // set column number
  useEffect(() => {
    const root = document.querySelector(":root") as HTMLElement;
    root.style.setProperty("--column-number", `${headerKey.length}`);
  });
  const [addModal, setAddModal] = useState<string>("");
  const mappedHeader = headerKey.map((el: string) => {
    return <p className="header">{el}</p>;
  });

  const mappedValues =
    documents.length > 0 &&
    documents.map((item: { [key: string]: any }) => {
      if (item) {
        return (
          <div className="row">
            {headerKey.map((el: string) => {
              if (headerObj[el] === "Image") {
                return (
                  <img
                    style={{ maxWidth: "100%", maxHeight: " 300px" }}
                    src={item[el]}
                  />
                );
              } else if (headerObj[el] === "Multiple Images") {
                if (item[el])
                  return (
                    <div className="collage">
                      {item[el].map((image: string) => (
                        <img
                          style={{ maxHeight: " 100px" }}
                          src={image}
                          alt={image}
                        ></img>
                      ))}
                    </div>
                  );
              }
              return <p>{item[el]?.replace(/(.{200})..+/, "$1...")}</p>;
            })}
          </div>
        );
      }
    });

  return (
    <>
      <div>
        {collectionName ? (
          <div>
            <DeleteCollection
              onClick={() =>
                handleDeleteCollection(
                  userDB as string,
                  collectionName as string
                )
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
        ) : null}

        <h1 style={{ marginLeft: "90px" }} className="document-collection-name">
          {collectionName}
        </h1>
        {/* {mappedValues ||
          (mappedHeader && ( */}
        <StyledDocument>
          {mappedHeader}
          {mappedValues}
        </StyledDocument>
        {/* ))} */}
      </div>
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
    </>
  );
};

export default DocumentSection;
