export function getDbNewPassword(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return ''
}
