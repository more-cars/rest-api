import {CarModelNode} from "../../../../models/node-types/car-models/types/CarModelNode"
import {marshalSingleNode} from "../../../nodes/marshalSingleNode"
import {CarModelResponse} from "../types/CarModelResponse"

export function marshalNode(node: CarModelNode) {
    return marshalSingleNode({
        id: node.attributes.id,
        name: node.attributes.name,
        built_from: node.attributes.built_from ?? null,
        built_to: node.attributes.built_to ?? null,
        generation: node.attributes.generation ?? null,
        internal_code: node.attributes.internal_code ?? null,
        total_production: node.attributes.total_production ?? null,
        created_at: node.attributes.created_at,
        updated_at: node.attributes.updated_at,
    }) as CarModelResponse
}
