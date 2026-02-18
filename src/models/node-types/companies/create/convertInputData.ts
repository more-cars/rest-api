import {CreateCompanyInput} from "../types/CreateCompanyInput"
import {InputCompanyCreate} from "../../../../db/nodes/companies/types/InputCompanyCreate"

export function convertInputData(data: CreateCompanyInput): InputCompanyCreate {
    const convertedData: InputCompanyCreate = {
        name: data.name,
        founded: data.founded,
        defunct: data.defunct,
        headquarters_location: data.headquarters_location,
        legal_headquarters_location: data.legal_headquarters_location,
    }

    return convertedData
}
