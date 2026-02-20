import type {Rel} from "../../models/relationships/types/Rel"
import type {ControllerNodeType} from "../nodes/types/ControllerNodeType"
import type {RelationResponse} from "./types/RelationResponse"
import {mapModelRelationTypeToControllerRelationType} from "./mapModelRelationTypeToControllerRelationType"
import {marshalSingleNode} from "../nodes/marshalSingleNode"
import {mapControllerNodeTypeToResponseNodeType} from "../nodes/mapControllerNodeTypeToResponseNodeType"

export function marshalRelation(relation: Rel, partnerNodeType: ControllerNodeType) {
    const marshalledData: RelationResponse = {
        data: {
            relationship_id: relation.id,
            relationship_name: mapModelRelationTypeToControllerRelationType(relation.type),
            relationship_partner: {
                node_type: mapControllerNodeTypeToResponseNodeType(partnerNodeType),
                data: marshalSingleNode(relation.destination).data,
            },
            created_at: relation.created_at,
            updated_at: relation.updated_at,
        },
    }

    return marshalledData
}
