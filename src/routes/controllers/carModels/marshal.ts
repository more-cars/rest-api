import {CarModelNode} from "../../../types/CarModelNode"

/**
 * Based on the given "car model" node this creates a response object
 * which conform to the API specification.
 */
export function marshal(carModel: CarModelNode) {
    const responseBody = {
        id: carModel.id,
        name: carModel.name,
        built_from: carModel.built_from ?? null,
        built_to: carModel.built_to ?? null,
        generation: carModel.generation ?? null,
        internal_code: carModel.internal_code ?? null,
        total_production: carModel.total_production ?? null,
    }

    return responseBody
}
