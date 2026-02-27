export class RelationshipTypeMappingNotFoundError extends Error {
    constructor(relType: string) {
        const message = `No mapping for relationship type ${relType} found.`
        super(message)
    }
}
