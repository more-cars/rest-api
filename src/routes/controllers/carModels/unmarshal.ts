import {CarModelNodeUserData} from "../../../types/car-models/CarModelNodeUserData"

/**
 * Picks all attributes from the request object which conform to the API specification.
 * Every other attributes in there will be ignored.
 */
export function unmarshal(body: any) {
    const node: CarModelNodeUserData = {
        name: body.name,
        built_from: body.built_from ?? null,
        built_to: body.built_to ?? null,
        generation: body.generation ?? null,
        internal_code: body.internal_code ?? null,
        total_production: body.total_production ?? null,
    }

    return node
}
