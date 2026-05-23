import type {Relation} from "../types/Relation"
import type {RelationResponseItem} from "../types/RelationResponseItem"
import type {RelationCollectionResponse} from "../types/RelationCollectionResponse"
import type {ControllerNodeType} from "../types/ControllerNodeType"
import type {RelationType} from "../types/RelationType"

export function marshalRelations(relations: Relation[], fromNodeType: ControllerNodeType, fromNodeId: number | number[], relationType: RelationType) {
    const items: RelationResponseItem[] = []

    for (const relation of relations) {
        const {id, ...attributes} = relation.to_node.fields
        items.push({
            type: relation.to_node.node_type,
            id,
            attributes,
        })
    }

    return {
        links: {
            self: `/${fromNodeType}/${fromNodeId}/${relationType}`,
        },
        data: items,
    } satisfies RelationCollectionResponse
}
