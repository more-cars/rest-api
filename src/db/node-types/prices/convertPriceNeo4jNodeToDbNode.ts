import {Node} from "neo4j-driver"
import {PriceNode} from "./types/PriceNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertPriceNeo4jNodeToDbNode(neo4jNode: Node): PriceNode {
    return {
        node_type: DbNodeType.Price,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            price: neo4jNode.properties.price,
            price_year: neo4jNode.properties.price_year,
            currency_code: neo4jNode.properties.currency_code,
            country_code: neo4jNode.properties.country_code,
        },
    } satisfies PriceNode
}
