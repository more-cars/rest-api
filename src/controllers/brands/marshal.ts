import {BrandResponse} from "./types/BrandResponse"
import {BrandNode} from "../../models/brands/types/BrandNode"

/**
 * Based on the given BRAND node this creates a response object
 * which conform to the API specification.
 */
export function marshal(brand: BrandNode) {
    const marshalledData: BrandResponse = {
        id: brand.id,
        name: brand.name,
        full_name: brand.full_name ?? null,
        founded: brand.founded ?? null,
        defunct: brand.defunct ?? null,
        wmi: brand.wmi ?? null,
        hsn: brand.hsn ?? null,
        created_at: brand.created_at,
        updated_at: brand.updated_at,
    }

    return marshalledData
}
