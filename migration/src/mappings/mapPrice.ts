import {Node} from "neo4j-driver"
import type {InputPriceCreate} from "../../../src/db/node-types/prices/types/InputPriceCreate"

export function mapPrice(oldNode: Node): InputPriceCreate {
    return {
        price: oldNode.properties.price,
        price_year: oldNode.properties.year,
        currency_code: oldNode.properties.currency,
        country_code: '--', // not available in old db, but a mandatory field
    }
}
