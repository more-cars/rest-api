import {CreatePriceInput} from "../types/CreatePriceInput"
import {InputPriceCreate} from "../../../../db/node-types/prices/types/InputPriceCreate"

export function convertInputData(data: CreatePriceInput): InputPriceCreate {
    return {
        price: data.price,
        price_year: data.price_year,
        currency_code: data.currency_code,
        country_code: data.country_code,
    } satisfies InputPriceCreate
}
