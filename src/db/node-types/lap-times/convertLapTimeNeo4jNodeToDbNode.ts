import {Node} from "neo4j-driver"
import {LapTimeNode} from "./types/LapTimeNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertLapTimeNeo4jNodeToDbNode(neo4jNode: Node): LapTimeNode {
    return {
        node_type: DbNodeType.LapTime,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,

            // user data
            time: neo4jNode.properties.time,
            driver_name: neo4jNode.properties.driver_name,
            date: neo4jNode.properties.date,
        },
    } satisfies LapTimeNode
}
