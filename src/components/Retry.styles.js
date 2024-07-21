import styled from "styled-components";

export const RetryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const RetryImg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
    height: auto;
  }

`;

export const RetryButton = styled.button`
  width: 80%;
  height: 10vh;
  text-align: center;
  margin: 30px;
  border: solid 1px rgb(128, 128, 128);
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 20px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #C7484A;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    width: 70%;
    height: 6vh;
  }
`;