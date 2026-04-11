export class WikimediaImageNotFoundError extends Error {
    constructor(id?: string) {
        const message = `No Wikimedia image with ID #${id} found.`
        super(message)
    }
}
