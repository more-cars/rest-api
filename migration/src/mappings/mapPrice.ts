import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapPrice(oldNode: Node): DbInputData {
    return {
        price: oldNode.properties.price,
        price_year: oldNode.properties.year,
        currency_code: oldNode.properties.currency,
        country_code: '--', // not available in old db, but a mandatory field
    }
}
