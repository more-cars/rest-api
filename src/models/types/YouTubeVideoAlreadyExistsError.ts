export class YouTubeVideoAlreadyExistsError extends Error {
    constructor(id: string) {
        const message = `The YouTube video with ID #${id} already exists.`
        super(message)
    }
}
