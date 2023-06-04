/// <reference types="cypress" />
describe("index.html", () => {
    beforeEach(() => {
        cy.visit("./replace-only-in-code-comment-tags/output/index.html");
    });

    it("has the original text", () => {
        cy.contains(".col-content", "WAS_REPLACED1").should("not.exist");
        cy.contains(".col-content", "WAS_REPLACED2").should("not.exist");
        cy.contains(".col-content", "REPLACE1");
        cy.contains(".col-content", "REPLACE2");
    });
});

describe("functions/a.A.html", () => {
    beforeEach(() => {
        cy.visit("./replace-only-in-code-comment-tags/output/functions/a.A.html");
    });

    it("has the original text in the comment description", () => {
        cy.contains(".col-content .tsd-comment:first-child p:first-child", "WAS_REPLACED1").should("not.exist");
        cy.contains(".col-content .tsd-comment:first-child p:first-child", "REPLACE1");
    });

    it("has the replaced text in the return tag description", () => {
        cy.contains(".col-content .tsd-comment:first-child h3+p", "WAS_REPLACED1");
        cy.contains(".col-content .tsd-comment:first-child h3+p", "REPLACE1").should("not.exist");
    });

    it("has the replaced text in the parameter tag description", () => {
        cy.contains(".col-content .tsd-parameters p", "WAS_REPLACED1");
        cy.contains(".col-content .tsd-parameters p", "REPLACE1").should("not.exist");
    });
});

describe("functions/b.B.html", () => {
    beforeEach(() => {
        cy.visit("./replace-only-in-code-comment-tags/output/functions/b.B.html");
    });

    it("has the original text in the comment description", () => {
        cy.contains(".col-content .tsd-comment:first-child p:first-child", "WAS_REPLACED1").should("not.exist");
        cy.contains(".col-content .tsd-comment:first-child p:first-child", "WAS_REPLACED2").should("not.exist");
        cy.contains(".col-content .tsd-comment:first-child p:first-child", "REPLACE1");
        cy.contains(".col-content .tsd-comment:first-child p:first-child", "replace2");
        cy.contains(".col-content .tsd-comment:first-child p:first-child", "RePlAcE3");
    });

    it("has the replaced text in the return tag description", () => {
        cy.contains(".col-content .tsd-comment:first-child h3+p", "WAS_REPLACED1");
        cy.contains(".col-content .tsd-comment:first-child h3+p", "WAS_REPLACED2");
        cy.contains(".col-content .tsd-comment:first-child h3+p", "REPLACE1").should("not.exist");
        cy.contains(".col-content .tsd-comment:first-child h3+p", "replace2").should("not.exist");
        cy.contains(".col-content .tsd-comment:first-child h3+p", "RePlAcE3").should("not.exist");
    });

    it("has the replaced text in the parameter tag description", () => {
        cy.contains(".col-content .tsd-parameters p", "WAS_REPLACED1");
        cy.contains(".col-content .tsd-parameters p", "WAS_REPLACED2");
        cy.contains(".col-content .tsd-parameters p", "REPLACE1").should("not.exist");
        cy.contains(".col-content .tsd-parameters p", "replace2").should("not.exist");
        cy.contains(".col-content .tsd-parameters p", "RePlAcE3").should("not.exist");
    });
});