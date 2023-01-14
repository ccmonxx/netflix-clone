import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    height: 110vh;
    background-color: ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.black.darker};
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 300;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
