export class NodeTypeMappingNotFoundError extends Error {
    constructor(nodeType: string) {
        const message = `No mapping for node type ${nodeType} found.`
        super(message)
    }
}
