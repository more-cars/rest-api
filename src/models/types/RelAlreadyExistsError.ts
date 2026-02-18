export class RelAlreadyExistsError extends Error {
    constructor(relType: string, startNodeId: number, endNodeId: number | null = null) {
        const message = `Relationship '${relType}' between #${startNodeId} and #${endNodeId} already exists.`
        super(message)
    }
}
