export class OutOfRangeError extends Error {
    constructor(message: string) {
        console.error(message)
        super(message)
    }
}
