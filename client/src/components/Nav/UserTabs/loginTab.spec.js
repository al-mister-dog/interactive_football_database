import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginTab from "./LoginTab";
import { AppProvider } from "../../../context";
import { BrowserRouter as Router } from "react-router-dom";

function setUp() {
  return render(
    <AppProvider>
      <Router>
        <LoginTab />
      </Router>
    </AppProvider>
  );
}

describe("Login Tab", () => {
  describe("layout", () => {
    it("has a login tab", () => {
      setUp()
      const loginTab = screen.getByRole("tab");
      expect(loginTab).toBeInTheDocument();
    });
    it("has a modal on click", () => {
      setUp()
      const loginTab = screen.getByRole("tab");
      userEvent.click(loginTab);
      const modal = screen.getByRole("presentation");
      expect(modal).toBeInTheDocument();
    });
    it("has email input in modal", () => {
      setUp()
      const loginTab = screen.getByRole("tab");
      userEvent.click(loginTab);
      const input = screen.getByLabelText("Email");
      expect(input).toBeInTheDocument();
    });
    it("has password input in modal", () => {
      setUp()
      const loginTab = screen.getByRole("tab");
      userEvent.click(loginTab);
      const input = screen.getByLabelText("Password");
      expect(input).toBeInTheDocument();
    });
    it("has login button in modal", () => {
      setUp()
      const loginTab = screen.getByRole("tab");
      userEvent.click(loginTab);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });
  describe("interactions", () => {
    let button, emailInput, passwordInput;
    function setupEmail(email = "user@mail.com") {
      render(
        <AppProvider>
          <Router>
            <LoginTab />
          </Router>
        </AppProvider>
      );
      const loginTab = screen.getByRole("tab");
      userEvent.click(loginTab);
      emailInput = screen.getByLabelText("Email");
      passwordInput = screen.getByLabelText("Password");
      userEvent.type(emailInput, email);
      userEvent.type(passwordInput, "P4ssword");
      button = screen.getByRole("button");
    }
    it("enables login button when valid credentials are entered", () => {
      setupEmail();
      expect(button).toBeEnabled();
    });
    it("does not enable login button when invalid credentials are entered", () => {
      setupEmail("invalid email");
      expect(button).toBeDisabled();
    });
    
  });
});
