import {BrandResponse} from "../types/BrandResponse"
import {BrandNode} from "../../../models/brands/types/BrandNode"

export function marshalNode(brand: BrandNode) {
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
