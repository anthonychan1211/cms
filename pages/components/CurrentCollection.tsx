import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledPartition = styled.div`
  padding: 5px 40px;
  border-right: 1px solid black;
  box-sizing: border-box;
  height: 100vh;
  button {
    width: 150px;
    justify-self: end;
    align-self: center;
    border: none;
    background-color: var(--light-blue);
    color: var(--black);
    font-size: 15px;
    border-radius: 10px;
    height: 40px;
    margin-bottom: 20px;
    :hover {
      box-sizing: border-box;
      box-shadow: 0px 0px 3px black;
    }
    :active {
      box-shadow: none;
    }
  }
  .no-collection {
    font-size: 20px;
  }
`;

const StyledCollection = styled.div`
  * {
    padding: 10px 30px;
    width: 150px;
    height: 50px;
    border-radius: 8px;
    font-size: 15px;
    box-sizing: border-box !important;
    margin-block: 2px;
    :hover {
      cursor: pointer;
      outline: 2px solid var(--light-grey);
      box-sizing: border-box;
    }
  }
  button {
    display: inline;
    width: 150px;
    margin: 0;
    padding: 0;
  }
`;

const StyledNewCollection = styled.input`
  height: 50px;
  width: 150px;
  font-size: 15px;
  padding-inline: 30px;
  border-radius: 8px;
`;
const CurrentCollection = ({ data, userDB }: any) => {
  const [showAddForm, setShowAddForm] = useState(false);
  function handleClick() {
    setShowAddForm(!showAddForm);
  }

  async function addCollection(e: any) {
    e.preventDefault();
    const newCollection = document.querySelector("input")!.value;
    console.log(newCollection);
    const res = await fetch(`http://localhost:3000/api/addCollection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newCollection: newCollection,
        userDB,
      }),
    });
    const data = await res.json();
    console.log(data);

    window.location.reload();
    return data;
  }
  return (
    <StyledPartition>
      <button onClick={handleClick}>+ Add Collection</button>
      <StyledCollection>
        {data.length > 0 ? data : <p>Add your first collection!</p>}
      </StyledCollection>
      {showAddForm ? (
        <form onSubmit={addCollection} className="add-form">
          <StyledNewCollection type="text"></StyledNewCollection>
          <button type="submit">Add</button>
        </form>
      ) : null}
    </StyledPartition>
  );
};

export default CurrentCollection;
