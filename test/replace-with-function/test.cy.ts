/// <reference types="cypress" />
import { descriptionSelector } from "../cypress/support/constants";

describe("functions/A.html", () => {
    beforeEach(() => {
        cy.visit("./replace-with-function/output/functions/A.html");
    });

    it("has the replaced text in the comment description", () => {
        cy.contains(descriptionSelector, "WAS_REPLACED_BY_FUNCTION");
        cy.contains(descriptionSelector, "REPLACE1").should("not.exist");
    });
});
