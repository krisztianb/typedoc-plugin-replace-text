@echo off

echo =================================== SETTING UP THE TESTS ===========================================
if not exist ..\dist (
    echo ERROR: Cannot find 'dist' folder. Did you forget to build the plugin?
    exit /b
)
echo Copying current build of plugin to node_modules for testing...
rmdir /S /Q ..\node_modules\typedoc-plugin-replace-text 2>nul
mkdir ..\node_modules\typedoc-plugin-replace-text\dist 2>nul
copy ..\package.json ..\node_modules\typedoc-plugin-replace-text
xcopy ..\dist ..\node_modules\typedoc-plugin-replace-text\dist /s /e
echo.

echo ============================= REPLACE ONLY IN CODE COMMENT TEXT ====================================
call npx typedoc --options replace-only-in-code-comment-text/typedoc.json
call npx cypress run --quiet --spec "replace-only-in-code-comment-text/test.cy.ts"

echo ============================= REPLACE ONLY IN CODE COMMENT TAGS ====================================
call npx typedoc --options replace-only-in-code-comment-tags/typedoc.json
call npx cypress run --quiet --spec "replace-only-in-code-comment-tags/test.cy.ts"

echo =============================== REPLACE ONLY IN INCLUDED FILES =====================================
call npx typedoc --options replace-only-in-included-files/typedoc.json
call npx cypress run --quiet --spec "replace-only-in-included-files/test.cy.ts"

echo =================================== REPLACE WITH FUNCTION ==========================================
call npx typedoc --options replace-with-function/typedoc.config.cjs
call npx cypress run --quiet --spec "replace-with-function/test.cy.ts"

echo ======================================== FINISHED ==================================================
