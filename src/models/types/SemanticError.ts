export class SemanticError extends Error {
    constructor(message: string) {
        console.error(message)
        super(message)
    }
}
