import * as React from "react";
import { ThemeProvider } from "styled-components";
import { Reboot } from 'styled-reboot';

import { theme } from "./ui/theme/default";
import Board from "./components/Board";

const App = (): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <Reboot />
    <Board />
  </ThemeProvider>
)

export default App;
