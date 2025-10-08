import {CarModelNode} from "../../../models/car-models/types/CarModelNode"
import {CarModelResponse} from "../types/CarModelResponse"

export function marshalNode(carModel: CarModelNode) {
    const marshalledData: CarModelResponse = {
        id: carModel.id,
        name: carModel.name,
        built_from: carModel.built_from ?? null,
        built_to: carModel.built_to ?? null,
        generation: carModel.generation ?? null,
        internal_code: carModel.internal_code ?? null,
        total_production: carModel.total_production ?? null,
        created_at: carModel.created_at,
        updated_at: carModel.updated_at,
    }

    return marshalledData
}
