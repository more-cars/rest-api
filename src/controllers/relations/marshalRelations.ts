import type {Rel} from "../../models/relationships/types/Rel"
import type {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import type {RelationResponse} from "./types/RelationResponse"
import type {RelationCollectionResponse} from "./types/RelationCollectionResponse"
import {marshalRelation} from "./marshalRelation"

export function marshalRelations(relationships: Rel[], partnerNodeType: NodeTypeEnum) {
    const items: RelationResponse[] = []

    for (const relationship of relationships) {
        items.push(marshalRelation(relationship, partnerNodeType))
    }

    return {data: items} as RelationCollectionResponse
}
