import { updateObject, getRandomArrayItem } from "./utilities";

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

  describe("getRandomArrayItem", () => {
    it("should return a random array item", () => {
      const array = ["test", "test 2"];
      const item = getRandomArrayItem(array);

      expect(typeof item).toBe("string");
      expect(array.includes(item)).toEqual(true);
    });
  });
});
