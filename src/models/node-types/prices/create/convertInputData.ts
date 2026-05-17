import type {PriceInput} from "../types/PriceInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: PriceInput): DbInputData {
    return {
        price: data.price,
        price_year: data.price_year,
        currency_code: data.currency_code,
        country_code: data.country_code,
    }
}
