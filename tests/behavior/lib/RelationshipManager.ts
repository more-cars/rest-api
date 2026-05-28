import type {RelationResponse} from "../../../src/controllers/types/RelationResponse"

const relationshipCache = new Map<string, RelationResponse>()
const relationshipCollectionCache = new Map<string, RelationResponse[]>()

export const RelationshipManager = {
    cacheRelationship(relationship: RelationResponse, label: string) {
        relationshipCache.set(label, relationship)
    },

    getRelationshipByLabel(label: string) {
        const relationship = relationshipCache.get(label)

        if (!relationship) {
            throw new Error(`No relationship found for label ${label}`)
        }

        return relationship
    },

    cacheRelationshipCollection(relationships: RelationResponse[], label: string) {
        relationshipCollectionCache.set(label, relationships)
    },
}
