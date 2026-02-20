import {BrandNode as BrandNodeInput} from "../../../../db/nodes/brands/types/BrandNode"
import {BrandNode} from "../types/BrandNode"

export function convertOutputData(data: BrandNodeInput): BrandNode {
    return {
        id: data.properties.id,
        name: data.properties.name,
        full_name: data.properties.full_name,
        founded: data.properties.founded,
        defunct: data.properties.defunct,
        wmi: data.properties.wmi,
        hsn: data.properties.hsn,
        created_at: data.properties.created_at,
        updated_at: data.properties.updated_at,
    } as BrandNode
}
