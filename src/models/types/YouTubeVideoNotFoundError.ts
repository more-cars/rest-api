export class YouTubeVideoNotFoundError extends Error {
    constructor(id: string) {
        const message = `No YouTube video with ID #${id} found.`
        super(message)
    }
}
