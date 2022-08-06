const { APP_MODE, createResponse } = require("./");

test("should createResponse create correct response", () => {
  const response = createResponse("Data", "Message", 13);
  expect(response.data).toBe("Data");
  expect(response.message).toBe("Message");
  expect(response.error).toBe(13);
});
