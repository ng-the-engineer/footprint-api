"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateTimeChecker_1 = require("./dateTimeChecker");
test("DateTimeChecker", function () {
    expect(dateTimeChecker_1.isValid("2021-06-08")).toBe(true);
    expect(dateTimeChecker_1.isValid("2021-13-50")).toBe(false);
    expect(dateTimeChecker_1.isValid("2021-02-29")).toBe(false);
    expect(dateTimeChecker_1.isValid("2021-03-32")).toBe(false);
    expect(dateTimeChecker_1.isValid("2021-00-00")).toBe(false);
});
