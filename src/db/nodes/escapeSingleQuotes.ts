export function escapeSingleQuotes(value: string): string {
    return value.replace(/'/g, "\\'")
}
