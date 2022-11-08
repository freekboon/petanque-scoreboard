import formatDuration from "./index";

describe("Formatting duration", () => {
  it("should show hours and minutes", () => {
    expect(formatDuration(150)).toEqual("2:30 hours");
  });
});
