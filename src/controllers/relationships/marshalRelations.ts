import type {Rel} from "../../models/relationships/types/Rel"
import type {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import type {RelationshipResponse} from "./types/RelationshipResponse"
import type {RelationshipCollectionResponse} from "./types/RelationshipCollectionResponse"
import {marshalRelation} from "./marshalRelation"

export function marshalRelations(relationships: Rel[], partnerNodeType: NodeTypeEnum) {
    const items: RelationshipResponse[] = []

    for (const relationship of relationships) {
        items.push(marshalRelation(relationship, partnerNodeType))
    }

    return {data: items} as RelationshipCollectionResponse
}
