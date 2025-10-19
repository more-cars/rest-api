import type {RelationshipResponse} from "./types/RelationshipResponse"
import type {NodeType} from "../nodes/types/NodeType"
import type {RelationshipCollectionResponse} from "./types/RelationshipCollectionResponse"
import type {GenericRelation} from "../../models/relationships/types/GenericRelation"
import {marshalRelation} from "./marshalRelation"

export function marshalRelations(relationships: GenericRelation[], partnerNodeType: NodeType) {
    const items: RelationshipResponse[] = []

    for (const relationship of relationships) {
        items.push(marshalRelation(relationship, partnerNodeType))
    }

    return {data: items} as RelationshipCollectionResponse
}
