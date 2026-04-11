export async function performFlickrApiRequest(url: string) {
    const response = await fetch(url)

    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('Flickr API request failed')
    }
}
