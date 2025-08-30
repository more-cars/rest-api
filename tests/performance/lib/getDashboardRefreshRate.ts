export function getDashboardRefreshRate(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return '3s'
}
