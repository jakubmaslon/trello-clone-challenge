import * as React from "react";

import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components'

import { Close } from '../ui/Close';
import { theme } from "../ui/theme/default";

const withTheme = (element: React.ReactElement) =>
  <ThemeProvider theme={theme}>
    {element}
  </ThemeProvider>

const CloseWTheme = withTheme(<Close />);

describe("Close component tests", () => {
  it('renders correctly', () => {
    const tree = renderer.create(CloseWTheme).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
