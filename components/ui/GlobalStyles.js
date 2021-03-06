import { createGlobalStyle } from 'styled-components'

import {
  AStyles,
  H1Styles,
  H2Styles,
  H3Styles,
  H4Styles,
  H5Styles,
  H6Styles,
  PCodeStyles,
  PreCodeStyles,
  PStyles,
} from './Typography'

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: ${props => props.theme.colors.neutral050};
    color: ${props => props.theme.colors.neutral800};
    font-size: 62.5%; /* base 10 rems */
  }
  * {
    box-sizing: border-box;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
  }
  h1 { ${H1Styles} }
  h2 { ${H2Styles} }
  h3 { ${H3Styles} }
  h4 { ${H4Styles} }
  h5 { ${H5Styles} }
  h6 { ${H6Styles} }
  p {
    margin: 0;
    ${PStyles}
  }
  li {
    ${PStyles}
    padding: 5px 0;
    overflow: display;
  }
  /* Inline code block: */
  p > code {
    ${PCodeStyles}
  }
  /* Multiline code block: */
  pre > code {
    ${PreCodeStyles}
  }
  a:focus,
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
  a {
    ${AStyles}
  }
  input {
    padding: 20px;
  }
  button {
    padding: 20px;
    cursor: pointer;
  }
  ::selection {
    background: ${props => props.theme.colors.primary050};
  }
`

export default GlobalStyles
