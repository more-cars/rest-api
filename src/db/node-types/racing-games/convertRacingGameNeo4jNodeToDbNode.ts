import {Node} from "neo4j-driver"
import {RacingGameNode} from "./types/RacingGameNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertRacingGameNeo4jNodeToDbNode(neo4jNode: Node): RacingGameNode {
    return {
        node_type: DbNodeType.RacingGame,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            name: neo4jNode.properties.name,
            release_year: neo4jNode.properties.release_year,
            developer: neo4jNode.properties.developer,
            publisher: neo4jNode.properties.publisher,
        },
    } satisfies RacingGameNode
}
