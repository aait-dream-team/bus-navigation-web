import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import the extend-expect module
import Header from "components/Header";

describe("Header Component", () => {
  it("should render correctly with the provided props", () => {
    const title = "Hello, World!";
    const subtitle = "Welcome to the test!";
    const { getByText } = render(<Header title={title} subtitle={subtitle} />);

    const titleElement = getByText(title);
    const subtitleElement = getByText(subtitle);
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });
});
