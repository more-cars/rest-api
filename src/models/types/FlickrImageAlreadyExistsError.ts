export class FlickrImageAlreadyExistsError extends Error {
    constructor(id: string) {
        const message = `The Flickr image with ID #${id} already exists.`
        super(message)
    }
}
