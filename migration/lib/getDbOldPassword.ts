export function getDbOldPassword(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return ''
}
