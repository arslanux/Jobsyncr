import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";

describe("Welcome component", () => {
  test("renders welcome message", () => {
    render(<Welcome />);
    const welcomeMessage = screen.getByText(
      /Welcome to Zerozilla Executive Search/i
    );
    expect(welcomeMessage).toBeInTheDocument();
  });

  test("renders create profile button", () => {
    render(<Welcome />);
    const createProfileButton = screen.getByRole("button", {
      name: /Create a Profile & Explore Opportunities/i,
    });
    expect(createProfileButton).toBeInTheDocument();
  });

  // Add more tests for other components and functionality as needed
});
