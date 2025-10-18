export class RelationshipTypeNotFoundError extends Error {
    constructor(relationshipType: string) {
        const message = `Relationship type '${relationshipType}' not found.`
        super(message)
    }
}
