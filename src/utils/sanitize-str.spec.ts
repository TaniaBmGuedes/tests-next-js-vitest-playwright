import { sanitizeStr } from "./sanitize-str";

describe("sanitizeStr (unit)", () => {
  test("should return a empty string when receive value that is false", () => {
    // @ts-expect-error testing function without params
    expect(sanitizeStr()).toBe("");
  });

  test("should return a empty string when receive a value that is not a string", () => {
    // @ts-expect-error testing function with wrong typing
    expect(sanitizeStr(123)).toBe("");
  });

  test("ensure that trim from string is sent", () => {
    expect(sanitizeStr("   a   ")).toBe("a");
  });

  test("ensure that string is normalized with NFC", () => {
    const original = "e\u0301";
    const expected = "é";
    expect(expected).toBe(sanitizeStr(original));
  });
});
