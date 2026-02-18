export class RelationTypeNotFoundError extends Error {
    constructor(relationType: string) {
        const message = `Relation type '${relationType}' not found.`
        super(message)
    }
}
