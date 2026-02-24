import {CreateBrandRawInput} from "../types/CreateBrandRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateBrandRawInput {
    return {
        name: data?.name,
        full_name: data?.full_name,
        founded: data?.founded,
        defunct: data?.defunct,
        wmi: data?.wmi,
        hsn: data?.hsn,
    } satisfies CreateBrandRawInput
}
