export function getBaseUrl() {
    const host = process.env.FLICKR_MOCK_SERVER_URL || "https://api.flickr.com"

    return `${host}/services/rest/`
}
