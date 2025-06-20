import {CarModelNode as CarModelNodeInput} from "../../../db/nodes/car-models/types/CarModelNode"
import {CarModelNode as CarModelNodeOutput} from "../types/CarModelNode"

export function convertOutputData(data: CarModelNodeInput): CarModelNodeOutput {
    const convertedData: CarModelNodeOutput = {
        id: data.id,
        name: data.name,
        built_from: data.built_from,
        built_to: data.built_to,
        generation: data.generation,
        internal_code: data.internal_code,
        total_production: data.total_production,
        created_at: data.created_at,
        updated_at: data.updated_at,
    }

    return convertedData
}
