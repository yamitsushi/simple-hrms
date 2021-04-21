import appMock from "./app";
import "./index";

jest.mock("./app");

describe("Test application entry point", () => {
	it("should call app.listen()", () => {
		expect(appMock.listen).toHaveBeenCalled();
	});
});
