import type {Relation} from "./types/Relation"
import type {RelationResponse} from "./types/RelationResponse"
import type {RelationCollectionResponse} from "./types/RelationCollectionResponse"
import {marshalRelation} from "./marshalRelation"

export function marshalRelations(relationships: Relation[]) {
    const items: RelationResponse[] = []

    for (const relationship of relationships) {
        items.push(marshalRelation(relationship))
    }

    return {data: items} as RelationCollectionResponse
}
