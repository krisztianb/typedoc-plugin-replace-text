import { DeclarationReflection, ReferenceReflection, Reflection, SignatureReflection } from "typedoc";

/**
 * Checks if the given reflection provides source code information.
 * @param reflection The reflection to check.
 * @returns True if the given reflection provides source code information, false otherwise.
 */
export function hasSources(
    reflection: Reflection,
): reflection is DeclarationReflection | ReferenceReflection | SignatureReflection {
    return (
        reflection instanceof DeclarationReflection ||
        reflection instanceof ReferenceReflection ||
        reflection instanceof SignatureReflection
    );
}
