export function getBaseUrl() {
    const host = process.env.FLICKR_SERVER_URL || "https://api.flickr.com"

    return `${host}/services/rest/`
}
