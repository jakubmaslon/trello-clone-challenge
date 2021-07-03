import * as React from "react";

import Board from "./components/Board";
import TaskEditor from "./components/TaskEditor";
import NavigationBar from "./components/NavigationBar";
import ContextProviders from "./components/ContextProviders"

const App = (): React.ReactElement =>
  <ContextProviders>
    <>
      <NavigationBar />
      <Board />
      <TaskEditor />
    </>
  </ContextProviders>

export default App;
