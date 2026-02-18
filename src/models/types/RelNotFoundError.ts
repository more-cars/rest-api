export class RelNotFoundError extends Error {
    constructor(relType: string, startNodeId: number, endNodeId: number | null = null) {
        const message = `Relationship '${relType}' between #${startNodeId} and #${endNodeId} not found.`
        super(message)
    }
}
