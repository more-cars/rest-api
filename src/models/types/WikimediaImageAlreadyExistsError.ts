export class WikimediaImageAlreadyExistsError extends Error {
    constructor(id: string) {
        const message = `The Wikimedia image with ID #${id} already exists.`
        super(message)
    }
}
