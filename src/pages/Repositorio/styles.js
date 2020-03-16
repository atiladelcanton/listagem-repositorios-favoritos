import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
export const Loading = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const Container = styled.div`
  max-width: 700px;
  margin: 80px auto;
`;
export const HeaderDetail = styled.header`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
`;
export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const Owner = styled.header`
  display: flex;

  align-items: center;
  flex-direction: column;
  img {
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  }
  h1 {
    font-size: 30px;
    color: #0d2636;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;
const fadein = keyframes`

  from {
    opacity: 0;
    margin-top: -10%;
  }
  to {
    opacity: 1;
    margin-top: 0%;
  }
`;

export const IssuesList = styled.ul`
  padding-top: 30px;
  list-style: none;
  margin-top: -9px;
  li {
    padding: 15px;
    background: white;
    margin-bottom: 5px;
    display: flex;
    padding: 15px 10px;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    animation: ${fadein} 2s;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #0d2636;
    }
    div {
      flex: 1;
      margin-left: 12px;
      p {
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
      .labels {
        width: 100%;
        margin: 0 auto;
        margin-top: 7px;
        span {
          background: #19b5fe;
          color: #fff;
          border-radius: 4px;
          font-size: 12px;
          padding: 4px 7px;
          margin-left: 2px;
        }
      }
      strong {
        font-size: 15px;

        a {
          text-decoration: none;
          color: #222;
          transform: 0.3s;
          &:hover {
            color: #0071bd;
          }
        }
      }
    }
  }
`;
export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 7px;
  button {
    outline: 0;
    border: 0;
    background: #446cb3;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
export const FilterList = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: center;

  button {
    outline: 0;
    border: 0;
    padding: 8px;
    border-radius: 4px;
    margin: 0 3px;
    background: #446cb3;
    color: #fff;

    &:nth-child(${props => props.active + 1}) {
      background: #1f3a93;
    }
  }
`;
