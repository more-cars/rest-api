import {CreateMagazineRawInput} from "../types/CreateMagazineRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateMagazineRawInput {
    return {
        name: data?.name,
        founded: data?.founded,
        defunct: data?.defunct,
        focus: data?.focus,
        publication_frequency: data?.publication_frequency,
        single_copy_price: data?.single_copy_price,
        single_copy_price_unit: data?.single_copy_price_unit,
        publication_format: data?.publication_format,
        circulation: data?.circulation,
        circulation_year: data?.circulation_year,
        publisher: data?.publisher,
        issn: data?.issn,
    } satisfies CreateMagazineRawInput
}
