import { useState } from "react";
import {
  StyledPartition,
  StyledCollection,
  StyledNewCollection,
} from "./styles";
import { addCollectionFetch } from "../../util/fetcher";
import { useRouter } from "next/router";
const CurrentCollection = ({ data = [], userDB }: any) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const router = useRouter();
  async function addCollection(e: any) {
    e.preventDefault();
    const newCollection = document.querySelector("input")!.value;
    const data = await addCollectionFetch(newCollection, userDB);
    if (data.message === "Collection added!") {
      window.location.replace(
        `${router.basePath}${userDB}?collection=${newCollection}`
      );
      setIsDuplicated(false);
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
        {data.length > 0 ? data : <p>Add your first collection!</p>}
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
