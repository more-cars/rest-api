import {CreateCompanyRawInput} from "../types/CreateCompanyRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateCompanyRawInput {
    return {
        name: data?.name,
        founded: data?.founded,
        defunct: data?.defunct,
        headquarters_location: data?.headquarters_location,
        legal_headquarters_location: data?.legal_headquarters_location,
    } satisfies CreateCompanyRawInput
}
