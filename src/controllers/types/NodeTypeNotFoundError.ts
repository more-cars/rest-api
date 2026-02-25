export class NodeTypeNotFoundError extends Error {
    constructor(nodeType: string) {
        const message = `Node type '${nodeType}' not found.`
        super(message)
    }
}
