import type {RelationshipResponse} from "./types/RelationshipResponse"
import type {NodeType} from "../nodes/types/NodeType"
import {marshalRelationship} from "./marshalRelationship"
import type {RelationshipCollectionResponse} from "./types/RelationshipCollectionResponse"

export function marshalRelationships(relationships: any[], partnerNodeType: NodeType) {
    const items: Array<RelationshipResponse> = []

    for (const relationship of relationships) {
        const relationshipPartner = relationship.partner_node
        items.push(marshalRelationship(relationship, relationshipPartner, partnerNodeType))
    }

    return {data: items} as RelationshipCollectionResponse
}
