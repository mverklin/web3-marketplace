import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #e0e5ec;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .neuomorphic {
    box-shadow: 9px 9px 16px #a3b1c6,
                -9px -9px 16px #ffffff;
    border-radius: 12px;
    background: #e0e5ec;
  }

  .neuomorphic-input {
    border: none;
    padding: 15px;
    border-radius: 10px;
    box-shadow: inset 6px 6px 10px #a3b1c6,
                inset -6px -6px 10px #ffffff;
    background: #e0e5ec;
  }
`;

export default GlobalStyle;
