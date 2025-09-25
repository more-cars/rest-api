export class RelationshipAlreadyExistsError extends Error {
    constructor(relationshipName: string, startNodeId: number, endNodeId: number | null = null) {
        const message = `Relationship '${relationshipName}' between #${startNodeId} and #${endNodeId} already exists.`
        super(message)
    }
}
