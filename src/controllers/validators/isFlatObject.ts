export function isFlatObject(data: unknown): data is Record<string, unknown> {
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return false
    }

    return Object.values(data).every(
        (v) => v === null || ["string", "number", "boolean", "undefined"].includes(typeof v)
    )
}
