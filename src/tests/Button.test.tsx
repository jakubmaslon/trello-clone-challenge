import * as React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components'

import { Button } from '../ui/Button';
import { theme } from "../ui/theme/default";

const withTheme = (element: React.ReactElement) =>
  <ThemeProvider theme={theme}>
    {element}
  </ThemeProvider>

const ButtonWTheme = withTheme(<Button />);
const ButtonDisabledWTheme = withTheme(<Button disabled />);

describe("Button component tests", () => {
  it('should render with styles for not disabled Button', () => {
    const { container: { firstChild } } = render(ButtonWTheme);

    expect(firstChild).toHaveStyleRule('border', 'none');
    expect(firstChild).toHaveStyleRule('cursor', 'pointer');
    expect(firstChild).toHaveStyleRule('opacity', '1');
  })

  it('should render with styles for disabled Button', () => {
    const { container: { firstChild } } = render(ButtonDisabledWTheme);

    expect(firstChild).toHaveStyleRule('cursor', 'not-allowed');
    expect(firstChild).toHaveStyleRule('opacity', '0.5');
  });

  it('renders correctly', () => {
    const tree = renderer.create(ButtonWTheme).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
