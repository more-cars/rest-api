import {BrandNode as BrandNodeInput} from "../../../db/nodes/brands/types/BrandNode"
import {BrandNode as BrandNodeOutput} from "../types/BrandNode"

export function convertOutputData(data: BrandNodeInput): BrandNodeOutput {
    const convertedData: BrandNodeOutput = {
        id: data.id,
        name: data.name,
        full_name: data.full_name,
        founded: data.founded,
        defunct: data.defunct,
        wmi: data.wmi,
        hsn: data.hsn,
        created_at: data.created_at,
        updated_at: data.updated_at,
    }

    return convertedData
}
