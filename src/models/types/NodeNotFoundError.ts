export class NodeNotFoundError extends Error {
    constructor(nodeId: number) {
        const message = `Node #${nodeId} not found.`
        super(message)
    }
}
