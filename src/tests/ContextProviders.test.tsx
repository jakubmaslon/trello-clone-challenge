import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import ContextProviders, { UserContext } from "../components/ContextProviders";

const userMock = "Spongebob";
const usersMock = ["Sponge", "Patrick", "Squid"];
const setUserMock = (user: string) => null;

describe("ContextProviders component tests", () => {
  it("should render ContextProviders", () => {
    const ContextProvidersRendered = render(
      <ContextProviders><div></div></ContextProviders>
    );

    expect(ContextProvidersRendered).toBeTruthy();
  });

  it("should render UserContext, provide and consume user", () => {
    const x = render(
      <UserContext.Provider value={{ user: userMock, setUser: setUserMock, users: usersMock }}>
        <UserContext.Consumer>
          {(data) => data.user}
        </UserContext.Consumer>
      </UserContext.Provider>
    )

    expect(x.container.textContent).toBe(userMock);
  });
})
