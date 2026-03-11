import {Node} from "neo4j-driver"
import {ProgrammeNode} from "./types/ProgrammeNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertProgrammeNeo4jNodeToDbNode(neo4jNode: Node): ProgrammeNode {
    return {
        node_type: DbNodeType.Programme,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,
    
            // user data
            name: neo4jNode.properties.name,
            aired_from_year: neo4jNode.properties.aired_from_year,
            aired_until_year: neo4jNode.properties.aired_until_year,
            channel: neo4jNode.properties.channel,
            total_seasons: neo4jNode.properties.total_seasons,
            total_episodes: neo4jNode.properties.total_episodes,
            regular_episode_running_time: neo4jNode.properties.regular_episode_running_time,
        },
    } satisfies ProgrammeNode
}
