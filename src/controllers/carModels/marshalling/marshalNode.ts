import {CarModelNode} from "../../../models/car-models/types/CarModelNode"
import {CarModelResponse} from "../types/CarModelResponse"

export function marshalNode(node: CarModelNode) {
    return {
        id: node.id,
        name: node.name,
        built_from: node.built_from ?? null,
        built_to: node.built_to ?? null,
        generation: node.generation ?? null,
        internal_code: node.internal_code ?? null,
        total_production: node.total_production ?? null,
        created_at: node.created_at,
        updated_at: node.updated_at,
    } as CarModelResponse
}
