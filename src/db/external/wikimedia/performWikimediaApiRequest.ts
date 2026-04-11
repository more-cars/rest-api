export async function performWikimediaApiRequest(url: string) {
    const response = await fetch(url)

    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('Wikimedia API request failed')
    }
}
