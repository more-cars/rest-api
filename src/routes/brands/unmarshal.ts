import {BrandNode} from "../../types/BrandNode"

/**
 * Picks all attributes from the request object which conform to the API specification.
 * Every other attributes in there will be ignored.
 */
export function unmarshal(body: any) {
    const carModel: BrandNode = {
        name: body.name,
        full_name: body.full_name ?? null,
        founded: body.founded ?? null,
        defunct: body.defunct ?? null,
        wmi: body.wmi ?? null,
        hsn: body.hsn ?? null,
    }

    return carModel
}