import type {BrandInput} from "../types/BrandInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: BrandInput): DbInputData {
    return {
        name: data.name,
        full_name: data.full_name,
        founded: data.founded,
        defunct: data.defunct,
        wmi: data.wmi,
        hsn: data.hsn,
        country_code: data.country_code,
    }
}
