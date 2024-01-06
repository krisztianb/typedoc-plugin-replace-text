import { DeclarationReflection, ReferenceReflection, Reflection, SignatureReflection } from "typedoc";

/**
 * Checks if the given reflection has a "sources" property.
 * @param reflection The reflection to check.
 * @returns True if the given reflection has a "sources" property, false otherwise.
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
