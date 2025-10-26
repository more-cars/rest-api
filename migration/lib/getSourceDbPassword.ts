export function getSourceDbPassword(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return ''
}
