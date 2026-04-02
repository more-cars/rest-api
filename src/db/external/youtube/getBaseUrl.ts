export function getBaseUrl() {
    const host = process.env.YOUTUBE_MOCK_SERVER_URL || "https://www.googleapis.com"

    return `${host}/youtube/v3/videos`
}
