import {CarModelNode as CarModelNodeInput} from "../../../../db/nodes/car-models/types/CarModelNode"
import {CarModelNode} from "../types/CarModelNode"

export function convertOutputData(data: CarModelNodeInput): CarModelNode {
    return {
        id: data.properties.id,
        name: data.properties.name,
        built_from: data.properties.built_from,
        built_to: data.properties.built_to,
        generation: data.properties.generation,
        internal_code: data.properties.internal_code,
        total_production: data.properties.total_production,
        created_at: data.properties.created_at,
        updated_at: data.properties.updated_at,
    } as CarModelNode
}
