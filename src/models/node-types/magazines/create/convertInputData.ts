import {CreateMagazineInput} from "../types/CreateMagazineInput"
import {InputMagazineCreate} from "../../../../db/node-types/magazines/types/InputMagazineCreate"

export function convertInputData(data: CreateMagazineInput): InputMagazineCreate {
    return {
        name: data.name,
        founded: data.founded,
        defunct: data.defunct,
        focus: data.focus,
        publication_frequency: data.publication_frequency,
        single_copy_price: data.single_copy_price,
        single_copy_price_unit: data.single_copy_price_unit,
        publication_format: data.publication_format,
        circulation: data.circulation,
        circulation_year: data.circulation_year,
        publisher: data.publisher,
        issn: data.issn,
    } satisfies InputMagazineCreate
}
