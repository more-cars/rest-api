import type {RelationshipResponse} from "./types/RelationshipResponse"
import type {NodeType} from "../nodes/types/NodeType"
import {marshalRelationship} from "./marshalRelationship"
import type {RelationshipCollectionResponse} from "./types/RelationshipCollectionResponse"
import type {BaseRelationship} from "./types/BaseRelationship"

export function marshalRelationships(relationships: BaseRelationship[], partnerNodeType: NodeType | null) {
    const items: Array<RelationshipResponse> = []

    for (const relationship of relationships) {
        const relationshipPartner = relationship.relationship_partner
        items.push(marshalRelationship(relationship, relationshipPartner, partnerNodeType))
    }

    return {data: items} as RelationshipCollectionResponse
}
