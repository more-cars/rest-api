import type {Relation} from "../types/Relation"
import type {RelationResponse} from "../types/RelationResponse"
import type {RelationCollectionResponse} from "../types/RelationCollectionResponse"
import {marshalSingleRelation} from "./marshalSingleRelation"

export function marshalRelations(relationships: Relation[]) {
    const items: RelationResponse[] = []

    for (const relationship of relationships) {
        items.push(marshalSingleRelation(relationship))
    }

    return {data: items} satisfies RelationCollectionResponse
}
