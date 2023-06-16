import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import the extend-expect module
import FlexBetween from "components/FlexBetween";

describe("FlexBetween Component", () => {
  it("should render correctly", () => {
    const { container } = render(<FlexBetween />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
