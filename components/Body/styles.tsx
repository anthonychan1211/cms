import styled from "styled-components";

export const StyledBody = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  @media screen and (max-width: 950px) {
    flex-direction: column;
  }
`;
