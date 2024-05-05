/** @format */

import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  font-family: sans-serif;
`;

const StyledApp = styled.main`
  /* padding: 2rem; */
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Wild Oasis</H1>
        <Button onClick={() => alert("clicked")}>Click Me</Button>
        <Input type='text' placeholder='Number of guests' />
      </StyledApp>
    </>
  );
}

export default App;
