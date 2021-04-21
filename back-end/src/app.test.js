import ExpressMock from "express";
import app from "./app";

jest.mock("express");

describe("Test appliation startup", () => {
	it("should return express", () => {
		expect(ExpressMock).toHaveReturnedWith(app);
	});
});
