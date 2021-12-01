import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "./Nav";
import { AppProvider } from "../../context";
import { BrowserRouter as Router } from "react-router-dom";

describe("Nav Bar", () => {
  describe("Layout", () => {
    it("Has an mui AppBar", () => {
      const { getByTestId } = render(
        <AppProvider>
          <Router>
            <Nav />
          </Router>
        </AppProvider>
      );
      const test = getByTestId("AppBar");
      expect(test).toBeInTheDocument();
    });
    it("Has an mui Toolbar", () => {
      const { getByTestId } = render(
        <AppProvider>
          <Router>
            <Nav />
          </Router>
        </AppProvider>
      );
      const test = getByTestId("Toolbar");
      expect(test).toBeInTheDocument();
    });
    it("contains tabs", () => {
      render(
        <AppProvider>
          <Router>
            <Nav />
          </Router>
        </AppProvider>
      );
      const test = screen.queryAllByRole("tab");
      expect(test[0]).toBeInTheDocument();
    });
    it("contains six tabs", () => {
      render(
        <AppProvider>
          <Router>
            <Nav />
          </Router>
        </AppProvider>
      );
      const test = screen.queryAllByRole("tab");
      expect(test.length).toBe(6);
    });
    it("Opens a menu when tab is clicked", () => {
      render(
        <AppProvider>
          <Router>
            <Nav />
          </Router>
        </AppProvider>
      );
      const tab = screen.queryAllByRole("tab")[0];
      userEvent.click(tab);
      const box = screen.getByTestId("Box");
      expect(box).toBeInTheDocument();
    });
  });
});
