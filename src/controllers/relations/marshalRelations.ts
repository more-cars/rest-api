import type {Rel} from "../../models/relationships/types/Rel"
import type {ControllerNodeType} from "../nodes/types/ControllerNodeType"
import type {RelationResponse} from "./types/RelationResponse"
import type {RelationCollectionResponse} from "./types/RelationCollectionResponse"
import {marshalRelation} from "./marshalRelation"

export function marshalRelations(relationships: Rel[], partnerNodeType: ControllerNodeType) {
    const items: RelationResponse[] = []

    for (const relationship of relationships) {
        items.push(marshalRelation(relationship, partnerNodeType))
    }

    return {data: items} as RelationCollectionResponse
}
