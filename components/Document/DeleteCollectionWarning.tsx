import { handleDeleteCollection } from "../../util/handlers";
import { StyledDeleteCollection } from "./styles";

const DeleteCollectionWarning = ({
  setDeleteCollectionWarning,
  userDB,
  collectionName,
}: {
  setDeleteCollectionWarning: React.Dispatch<React.SetStateAction<boolean>>;
  userDB: string;
  collectionName: string;
}) => {
  return (
    <StyledDeleteCollection>
      <div className="inner-modal">
        <h4>Delete Current Collection</h4>
        <p>
          Deleting the current collection will cause loss of all data in this
          collection. Do you confirm the action?
        </p>

        <div className="submit-section">
          <button
            className="cancel-button"
            onClick={() => {
              setDeleteCollectionWarning(false);
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="confirm-button"
            onClick={() =>
              handleDeleteCollection(userDB as string, collectionName as string)
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </StyledDeleteCollection>
  );
};

export default DeleteCollectionWarning;
