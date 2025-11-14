import { Profiles } from "./profiles.repository";

describe("Profiles", () => {
  it("should be defined", () => {
    expect(new Profiles()).toBeDefined();
  });
});
