import type {GenericRelation} from "../../models/relationships/types/GenericRelation"
import type {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import type {RelationshipResponse} from "./types/RelationshipResponse"
import type {RelationshipCollectionResponse} from "./types/RelationshipCollectionResponse"
import {marshalRelation} from "./marshalRelation"

export function marshalRelations(relationships: GenericRelation[], partnerNodeType: NodeTypeEnum) {
    const items: RelationshipResponse[] = []

    for (const relationship of relationships) {
        items.push(marshalRelation(relationship, partnerNodeType))
    }

    return {data: items} as RelationshipCollectionResponse
}
