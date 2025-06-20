import {CreateBrandResponse} from "./types/CreateBrandResponse"
import {BrandNode} from "../../models/brands/types/BrandNode"

/**
 * Based on the given BRAND node this creates a response object
 * which conform to the API specification.
 */
export function marshal(brand: BrandNode) {
    const marshalledData: CreateBrandResponse = {
        id: brand.id,
        name: brand.name,
        full_name: brand.full_name,
        founded: brand.founded,
        defunct: brand.defunct,
        wmi: brand.wmi,
        hsn: brand.hsn,
        created_at: brand.created_at,
        updated_at: brand.updated_at,
    }

    return marshalledData
}
