import { isValid } from "./dateTimeChecker";

test("DateTimeChecker", () => {
  expect(isValid("2021-06-08")).toBe(true);
  expect(isValid("2021-13-50")).toBe(false);
  expect(isValid("2021-02-29")).toBe(false);
  expect(isValid("2021-03-32")).toBe(false);
  expect(isValid("2021-00-00")).toBe(false);
});
