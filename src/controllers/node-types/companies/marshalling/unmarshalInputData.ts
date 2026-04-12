import {CreateCompanyRawInput} from "../types/CreateCompanyRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateCompanyRawInput {
    return {
        name: data?.name,
        founded: data?.founded,
        defunct: data?.defunct,
        headquarters_location: data?.headquarters_location,
        hq_country_code: data?.hq_country_code,
        legal_headquarters_location: data?.legal_headquarters_location,
        legal_hq_country_code: data?.legal_hq_country_code,
    } satisfies CreateCompanyRawInput
}
