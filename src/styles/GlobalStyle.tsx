import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.black.darker};
    color: ${(props) => props.theme.white.darker};
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 300;
    line-height: 1.2;
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
