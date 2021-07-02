import * as React from "react";
import styled from "styled-components";

const StyledComponent = styled.h1`
  color: red;
`;

const App = (): React.ReactElement => {
  return (
    <div>
      Hello world
      <StyledComponent>Styled h1</StyledComponent>
    </div>
  )
}

export default App;
