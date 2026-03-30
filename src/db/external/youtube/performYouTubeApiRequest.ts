export async function performYouTubeApiRequest(url: string) {
    const response = await fetch(url)

    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('Unable to retrieve YouTube video')
    }
}
