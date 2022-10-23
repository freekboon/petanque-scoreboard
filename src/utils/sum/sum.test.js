import sum from "~utils/sum/index.js";

describe("Sum", () => {
  it("should add two variables", () => {
    expect(sum(2, 3)).toEqual(5);
  });
});
