import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle: any = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }
  html, body, #root {
    width: 100%;
    height: 100%;

    font-family: 'Noto Sans KR', sans-serif;
    font-size: 12px;
    font-weight: normal;
    line-height: 1.4;
    
    color: white;
    background-color: black;

    margin: 0;
    padding: 0;
    user-select: none;
  } 
  input, textarea { 
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  input:focus {
    outline: none;
  }
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  span {
    display: inline-block;
  }
  ::-webkit-scrollbar {
    width: 12px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: #8f8f8fc9;
    border-radius: 8px;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export default GlobalStyle;
