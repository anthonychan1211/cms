import { useState } from "react";
import {
  NewEntry,
  DeleteCollection,
  StyledDocument,
  StyledHeaderForm,
  AddEntry,
} from "./styles";
import DocumentHeaderProperty from "./DocumentHeaderProperty";
import { addHeader } from "../../util/fetcher";
import {
  extractHeader,
  handleAddHeaderForm,
  handleDeleteCollection,
} from "../../util/handlers";
import AddNewDocumentModal from "./AddNewDocumentModal";
import AddNewHeaderModal from "./AddNewHeaderModal";

interface DocumentType {
  headerObj: any;
  values: string[];
  collectionName: string;
  userDB: string;
}

const DocumentSection = ({
  headerObj = {},
  values = [],
  collectionName,
  userDB,
}: DocumentType) => {
  // extract header
  const headerKey = extractHeader(headerObj);

  // set column number
  if (typeof window === "object") {
    const root = document.querySelector(":root") as HTMLElement;
    root.style.setProperty("--column-number", `${headerKey.length}`);
  }
  const [addModal, setAddModal] = useState<string>("");
  const mappedHeader = headerKey.map((el: string) => {
    return <p className="header">{el}</p>;
  });

  const mappedValues =
    values.length > 0 &&
    values.map((item: any) => {
      return (
        <div className="row">
          {item.map((el: any) => {
            return <p>{el}</p>;
          })}
        </div>
      );
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
        {mappedValues ||
          (mappedHeader && (
            <StyledDocument>
              {mappedHeader}
              {mappedValues}
            </StyledDocument>
          ))}
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
          headerKey={headerKey}
          collectionName={collectionName}
          values={values}
          headerObj={headerObj}
          setAddModal={setAddModal}
        />
      )}
    </>
  );
};

export default DocumentSection;
