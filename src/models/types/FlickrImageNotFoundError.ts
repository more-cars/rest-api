export class FlickrImageNotFoundError extends Error {
    constructor(id?: string) {
        const message = `No Flickr image with ID #${id} found.`
        super(message)
    }
}
