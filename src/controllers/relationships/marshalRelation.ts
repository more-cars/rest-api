import {dasherize} from "inflection"
import type {GenericRelation} from "../../models/relationships/types/GenericRelation"
import type {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import {marshalSingleNode} from "../nodes/marshalSingleNode"
import type {RelationshipResponse} from "./types/RelationshipResponse"

export function marshalRelation(relation: GenericRelation, partnerNodeType: NodeTypeEnum) {
    return {
        data: {
            relationship_id: relation.id,
            relationship_name: dasherize(relation.type.toLowerCase()),
            relationship_partner: {
                node_type: dasherize(partnerNodeType),
                data: marshalSingleNode(relation.destination).data,
            },
            created_at: relation.created_at,
            updated_at: relation.updated_at,
        },
    } as RelationshipResponse
}
