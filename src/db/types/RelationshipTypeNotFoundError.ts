export class RelationshipTypeNotFoundError extends Error {
    constructor(relationshipType: string) {
        const message = `Relation type '${relationshipType}' not found.`
        super(message)
    }
}
