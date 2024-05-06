/** @format */

import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.main`
  /* padding: 2rem; */
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type='horizontal'>
            <Heading as='h1'>Wild Oasis</Heading>
            <div>
              <Heading as='h2'>Options</Heading>
              <Button onClick={() => alert("clicked")}>Check-in</Button>
              <Button
                variation='danger'
                size='small'
                onClick={() => alert("clicked")}
              >
                Check-out
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as='h3'>Form</Heading>
            <form action=''>
              <Input type='text' placeholder='Number of guests' />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
