import { updateObject } from "./utilities";

describe("shared utility functions", () => {
  describe("updateObject", () => {
    it("should return a new updated object", () => {
      const original = {
        test: "test",
        item: "test",
      };
      const newProperties = {
        new: "test",
        item: "new",
      };
      const updated = updateObject(original, newProperties);

      expect(updated).not.toEqual(original);
      expect(updated).not.toEqual(newProperties);
      expect(updated.test).toEqual(original.test);
      expect(updated.new).toEqual(newProperties.new);
      expect(updated.item).toEqual(newProperties.item);
    });
  });
});
