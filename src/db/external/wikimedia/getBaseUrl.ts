export function getBaseUrl() {
    const host = process.env.WIKIMEDIA_MOCK_SERVER_URL || "https://commons.wikimedia.org"

    return `${host}/w/api.php`
}
