import type {ControllerNodeType} from "../types/ControllerNodeType"
import type {RelationType} from "../types/RelationType"
import type {RelationResponse} from "../types/RelationResponse"

export function marshalEmptyRelation(fromNodeType: ControllerNodeType, fromNodeId: number, relationType: RelationType) {
    const marshalledRelation: RelationResponse = {
        links: {
            self: `/${fromNodeType}/${fromNodeId}/${relationType}`,
        },
        data: null
    }

    return marshalledRelation
}
