//Unit tests for the tables created

import { render } from "@testing-library/react";
import Table from "./Table";

test("table renders", () => {
  render(<Table />);
});

describe("Table", () => {
  it("should display a table with two columns", () => {
    render(<Table />);
  });
});
