export function getTargetDbPassword(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return ''
}
