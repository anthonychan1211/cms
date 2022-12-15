import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledPartition = styled.div`
  padding: 5px 40px;
  border-right: 1px solid black;
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
  padding: 10px 30px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 15px;
  :hover {
    background-color: #eee;
    cursor: pointer;
    /* border: 2px solid var(--dark-blue); */
  }
`;

const currentCollection = () => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/fetchCollection", {
        method: "GET",
      });
      const data = await result.json();
      console.log(typeof data);
      setCollection(data.results);
    };
    fetchData();
  }, []);
  console.log(collection);
  console.log(collection.length);
  const displayCollection = collection.map((data: any) => {
    return <StyledCollection>{data.name}</StyledCollection>;
  });

  return (
    <StyledPartition>
      <button>+ Add Collection</button>
      {/* {collection.length > 0 ? (
        { displayCollection }
      ) : (
        <p className="no-collection">Add you first collection!</p>
      )} */}
      {displayCollection}
    </StyledPartition>
  );
};

export default currentCollection;
