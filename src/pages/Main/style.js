import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  margin: 80px auto;
`;
export const ContainerForm = styled.div`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`;
export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? "#FF0000" : "#ddd")};
    padding: 10px 15px;
    border-radius: 24px;
    font-size: 17px;
  }
`;

//Criando animacao botoa

const animate = keyframes`
from{
  transform:rotate(0deg);
}
to{
  transform:rotate(360deg);
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

export const SubmitButton = styled.button.attrs(props => ({
  disabled: props.loading,
  type: "submit"
}))`
  background: #00b5cc;
  border: 0;
  border-radius: 50%;
  margin-left: -45px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;
  li {
    padding: 15px;
    background: white;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    animation: ${fadein} 2s;
    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #00b5cc;
      img {
        width: 30px;
        height: auto;
        margin-right: 20px;
        border-radius: 50%;
      }
    }
    a {
      color: #00b5cc;
    }
  }
`;
