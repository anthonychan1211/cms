import { useState } from "react";
import {
  StyledPartition,
  StyledCollection,
  StyledNewCollection,
} from "./styles";
import { addCollectionFetch } from "../../util/fetcher";

const CurrentCollection = ({
  collectionsList = [],
  userDB,
}: {
  collectionsList: JSX.Element[];
  userDB: string;
}): JSX.Element => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  async function addCollection(e: any) {
    e.preventDefault();
    const data = await addCollectionFetch(newCollectionName, userDB);
    if (data.status === 200) {
      setIsDuplicated(false);
      setShowAddForm(false);
      window.sessionStorage.setItem("lastSelect", newCollectionName);
      window.location.reload();
    } else {
      setIsDuplicated(true);
    }
  }
  return (
    <StyledPartition>
      {!showAddForm ? (
        <button
          className="add-collection"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          + Add Collection
        </button>
      ) : (
        <button
          className="add-collection"
          style={{ backgroundColor: "red" }}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          - Close Add Collection
        </button>
      )}
      <StyledCollection>
        {collectionsList.length > 0 ? (
          collectionsList
        ) : (
          <p>Add your first collection!</p>
        )}
      </StyledCollection>
      {showAddForm && (
        <StyledNewCollection onSubmit={addCollection} className="add-form">
          <div className="form__group field">
            <input
              type="text"
              className="form__field"
              placeholder="New Collection"
              name="newCollection"
              id="newCollection"
              onChange={(e) => setNewCollectionName(e.target.value)}
              required
            />
            <label htmlFor="newCollection" className="form__label">
              New Collection
            </label>
          </div>
          <button type="submit">Add</button>
        </StyledNewCollection>
      )}
      {isDuplicated && (
        <p className="duplicate-collection-name">
          Please try another collection name.
        </p>
      )}
    </StyledPartition>
  );
};

export default CurrentCollection;
