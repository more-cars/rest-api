export class RelTypeNotFoundError extends Error {
    constructor(relType: string) {
        const message = `Relationship type '${relType}' not found.`
        super(message)
    }
}
