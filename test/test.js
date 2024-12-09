import { execSync } from "node:child_process";

console.log("============================= REPLACE ONLY IN CODE COMMENT TEXT ====================================");
execSync("npx typedoc --options replace-only-in-code-comment-text/typedoc.json", { stdio: "inherit" });
execSync("npx cypress run --quiet --spec 'replace-only-in-code-comment-text/test.cy.ts'", { stdio: "inherit" });

console.log("============================= REPLACE ONLY IN CODE COMMENT TAGS ====================================");
execSync("npx typedoc --options replace-only-in-code-comment-tags/typedoc.json", { stdio: "inherit" });
execSync("npx cypress run --quiet --spec 'replace-only-in-code-comment-tags/test.cy.ts'", { stdio: "inherit" });

console.log("==================================== REPLACE IN MARKDOWN ===========================================");
execSync("npx typedoc --options replace-in-markdown/typedoc.json", { stdio: "inherit" });
execSync("npx cypress run --quiet --spec 'replace-in-markdown/test.cy.ts'", { stdio: "inherit" });

console.log("=================================== REPLACE WITH FUNCTION ==========================================");
execSync("npx typedoc --options replace-with-function/typedoc.config.cjs", { stdio: "inherit" });
execSync("npx cypress run --quiet --spec 'replace-with-function/test.cy.ts'", { stdio: "inherit" });

console.log("======================================== FINISHED ==================================================");
