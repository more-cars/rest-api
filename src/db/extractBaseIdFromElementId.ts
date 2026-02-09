/**
 * Expects a Neo4j element id as input. E.g. "4:f86eb04b-536d-4319-a8e9-8cb965f985bc:110".
 * Extracts the last part of the element id (the number after the final colon).
 */
export function extractBaseIdFromElementId(elementId: string): number {
    const parts: string[] = elementId.split(':')
    const baseId = parseInt(parts[2])

    return baseId
}
