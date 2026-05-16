import type {CompanyInput} from "../types/CompanyInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: CompanyInput): DbInputData {
    return {
        name: data.name,
        founded: data.founded,
        defunct: data.defunct,
        headquarters_location: data.headquarters_location,
        hq_country_code: data.hq_country_code,
        legal_headquarters_location: data.legal_headquarters_location,
        legal_hq_country_code: data.legal_hq_country_code,
    }
}
