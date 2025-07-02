export function escapeSingleQuotes(value: string): string {
    value = value.replace(/\\/g, "\\\\")
    value = value.replace(/'/g, "\\'")

    return value
}
