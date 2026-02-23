import {CreateCompanyInput} from "../types/CreateCompanyInput"
import {InputCompanyCreate} from "../../../../db/node-types/companies/types/InputCompanyCreate"

export function convertInputData(data: CreateCompanyInput): InputCompanyCreate {
    return {
        name: data.name,
        founded: data.founded,
        defunct: data.defunct,
        headquarters_location: data.headquarters_location,
        legal_headquarters_location: data.legal_headquarters_location,
    } satisfies InputCompanyCreate
}
