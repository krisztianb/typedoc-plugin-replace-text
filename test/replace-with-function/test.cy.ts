/// <reference types="cypress" />
describe("functions/A.html", () => {
    beforeEach(() => {
        cy.visit("./replace-with-function/output/functions/A.html");
    });

    it("has the replaced text in the comment description", () => {
        cy.contains(".col-content .tsd-comment:first-child p:first-child", "WAS_REPLACED_BY_FUNCTION");
        cy.contains(".col-content .tsd-comment:first-child p:first-child", "REPLACE1").should("not.exist");
    });
});
