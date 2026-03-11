import {Node} from "neo4j-driver"
import {ProgrammeEpisodeNode} from "./types/ProgrammeEpisodeNode"
import {DbNodeType} from "../../types/DbNodeType"

export function convertProgrammeEpisodeNeo4jNodeToDbNode(neo4jNode: Node): ProgrammeEpisodeNode {
    return {
        node_type: DbNodeType.ProgrammeEpisode,
        properties: {
            // system data
            id: neo4jNode.properties.mc_id,
            created_at: neo4jNode.properties.created_at,
            updated_at: neo4jNode.properties.updated_at,
    
            // user data
            title: neo4jNode.properties.title,
            season_number: neo4jNode.properties.season_number,
            season_episode_number: neo4jNode.properties.season_episode_number,
            original_air_date: neo4jNode.properties.original_air_date,
            duration: neo4jNode.properties.duration,
        },
    } satisfies ProgrammeEpisodeNode
}
