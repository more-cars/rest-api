import {Node} from "neo4j-driver"
import {MagazineNode} from "./types/MagazineNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertMagazineNeo4jNodeToDbNode(neo4jNode: Node): MagazineNode {
    return {
        node_type: DbNodeType.Magazine,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,
    
            // user data
            name: neo4jNode.properties.name,
            founded: neo4jNode.properties.founded,
            defunct: neo4jNode.properties.defunct,
            focus: neo4jNode.properties.focus,
            publication_frequency: neo4jNode.properties.publication_frequency,
            single_copy_price: neo4jNode.properties.single_copy_price,
            single_copy_price_unit: neo4jNode.properties.single_copy_price_unit,
            publication_format: neo4jNode.properties.publication_format,
            circulation: neo4jNode.properties.circulation,
            circulation_year: neo4jNode.properties.circulation_year,
            publisher: neo4jNode.properties.publisher,
            issn: neo4jNode.properties.issn,
        },
    } satisfies MagazineNode
}
