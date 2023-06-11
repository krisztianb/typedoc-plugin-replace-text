/// <reference types="cypress" />
import { contentSelector, descriptionSelector, parameterSelector, returnSelector } from "../cypress/support/constants";

describe("index.html", () => {
    beforeEach(() => {
        cy.visit("./replace-only-in-code-comment-tags/output/index.html");
    });

    it("has the original text", () => {
        cy.contains(contentSelector, "WAS_REPLACED1").should("not.exist");
        cy.contains(contentSelector, "WAS_REPLACED2").should("not.exist");
        cy.contains(contentSelector, "REPLACE1");
        cy.contains(contentSelector, "REPLACE2");
    });
});

describe("functions/a.A.html", () => {
    beforeEach(() => {
        cy.visit("./replace-only-in-code-comment-tags/output/functions/a.A.html");
    });

    it("has the original text in the comment description", () => {
        cy.contains(descriptionSelector, "WAS_REPLACED1").should("not.exist");
        cy.contains(descriptionSelector, "REPLACE1");
    });

    it("has the replaced text in the return tag description", () => {
        cy.contains(returnSelector, "WAS_REPLACED1");
        cy.contains(returnSelector, "REPLACE1").should("not.exist");
    });

    it("has the replaced text in the parameter tag description", () => {
        cy.contains(parameterSelector, "WAS_REPLACED1");
        cy.contains(parameterSelector, "REPLACE1").should("not.exist");
    });
});

describe("functions/b.B.html", () => {
    beforeEach(() => {
        cy.visit("./replace-only-in-code-comment-tags/output/functions/b.B.html");
    });

    it("has the original text in the comment description", () => {
        cy.contains(descriptionSelector, "WAS_REPLACED1").should("not.exist");
        cy.contains(descriptionSelector, "WAS_REPLACED2").should("not.exist");
        cy.contains(descriptionSelector, "REPLACE1");
        cy.contains(descriptionSelector, "replace2");
        cy.contains(descriptionSelector, "RePlAcE3");
    });

    it("has the replaced text in the return tag description", () => {
        cy.contains(returnSelector, "WAS_REPLACED1");
        cy.contains(returnSelector, "WAS_REPLACED2");
        cy.contains(returnSelector, "REPLACE1").should("not.exist");
        cy.contains(returnSelector, "replace2").should("not.exist");
        cy.contains(returnSelector, "RePlAcE3").should("not.exist");
    });

    it("has the replaced text in the parameter tag description", () => {
        cy.contains(parameterSelector, "WAS_REPLACED1");
        cy.contains(parameterSelector, "WAS_REPLACED2");
        cy.contains(parameterSelector, "REPLACE1").should("not.exist");
        cy.contains(parameterSelector, "replace2").should("not.exist");
        cy.contains(parameterSelector, "RePlAcE3").should("not.exist");
    });
});
