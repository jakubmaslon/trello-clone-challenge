import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import Board from '../components/Board';
import ContextProviders from "../components/ContextProviders";
import { TEST_IDS } from "../typings/global";

describe("Board component tests", () => {
  const BoardRendered = render(
    <ContextProviders>
      <Board />
    </ContextProviders>
  );

  it("should render six column, one for each STATUS (6)", () => {
    const { getAllByTestId } = BoardRendered;
    const boardColumns = getAllByTestId(TEST_IDS.BOARD_COLUMN);
    expect(boardColumns).toHaveLength(6);
  });
})
