import type {Rel} from "../../models/relationships/types/Rel"
import type {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import type {RelationshipResponse} from "./types/RelationshipResponse"
import {mapModelRelationToControllerRelation} from "./mapModelRelationToControllerRelation"
import {dasherize} from "inflection"
import {marshalSingleNode} from "../nodes/marshalSingleNode"

export function marshalRelation(relation: Rel, partnerNodeType: NodeTypeEnum) {
    const marshalledData: RelationshipResponse = {
        data: {
            relationship_id: relation.id,
            relationship_name: mapModelRelationToControllerRelation(relation.type),
            relationship_partner: {
                node_type: dasherize(partnerNodeType),
                data: marshalSingleNode(relation.destination).data,
            },
            created_at: relation.created_at,
            updated_at: relation.updated_at,
        },
    }

    return marshalledData
}
