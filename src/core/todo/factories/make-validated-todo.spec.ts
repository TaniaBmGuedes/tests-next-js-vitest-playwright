import * as sanitizeStrMod from "@/utils/sanitize-str";
import { makeValidatedTod } from './make-validated-todo';


describe("makeValidatedTodo (unit)", () => {
  test("should call sanitizeStr function with the correct value", () => {
    //Arrange
    const description = "abcd";
    const sanitizeStrSpy = vi
      .spyOn(sanitizeStrMod, "sanitizeStr")
      .mockReturnValue(description);
    
      //Act
    makeValidatedTod(description);

    // Assert
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
  });

  // test('should call  validateTodoDescription fcuntion with sanitizeStr function result', () => {});

  // test('should call  makeNewTodo  function if validatedDescription  returned success', () => {});

  // test('should call "return validatedDescription.error"  if validation failed', () => {});
});
