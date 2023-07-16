/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");
const fs = require("fs");

console.log("=================================== SETTING UP THE TESTS ===========================================");

if (!fs.existsSync("..\\dist")) {
    console.error("ERROR: Cannot find 'dist' folder. Did you forget to build the plugin with 'npm run build'?");
    process.exit(1);
}

console.log("Copying current build of plugin to node_modules for testing...");

fs.rm("..\\node_modules\\typedoc-plugin-replace-text", { recursive: true, force: true });
fs.mkdirSync("..\\node_modules\\typedoc-plugin-replace-text\\dist", { recursive: true });
fs.copyFileSync("..\\package.json", "..\\node_modules\\typedoc-plugin-replace-text\\package.json");
fs.cpSync("..\\dist", "..\\node_modules\\typedoc-plugin-replace-text\\dist", { recursive: true });

console.log("DONE\n");

console.log("============================= REPLACE ONLY IN CODE COMMENT TEXT ====================================");
execSync("npx typedoc --options replace-only-in-code-comment-text/typedoc.json", { stdio: "inherit" });
execSync("npx cypress run --quiet --spec 'replace-only-in-code-comment-text/test.cy.ts'", { stdio: "inherit" });

console.log("============================= REPLACE ONLY IN CODE COMMENT TAGS ====================================");
execSync("npx typedoc --options replace-only-in-code-comment-tags/typedoc.json", { stdio: "inherit" });
execSync("npx cypress run --quiet --spec 'replace-only-in-code-comment-tags/test.cy.ts'", { stdio: "inherit" });

console.log("=============================== REPLACE ONLY IN INCLUDED FILES =====================================");
execSync("npx typedoc --options replace-only-in-included-files/typedoc.json", { stdio: "inherit" });
execSync("npx cypress run --quiet --spec 'replace-only-in-included-files/test.cy.ts'", { stdio: "inherit" });

console.log("=================================== REPLACE WITH FUNCTION ==========================================");
execSync("npx typedoc --options replace-with-function/typedoc.config.cjs", { stdio: "inherit" });
execSync("npx cypress run --quiet --spec 'replace-with-function/test.cy.ts'", { stdio: "inherit" });

console.log("======================================== FINISHED ==================================================");
