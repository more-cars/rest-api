import {Node} from "neo4j-driver"
import {SessionResultNode} from "./types/SessionResultNode"

export function mapDbNodeToSessionResultNode(dbNode: Node): SessionResultNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        position: dbNode.properties.position,
        race_number: dbNode.properties.race_number,
        driver_name: dbNode.properties.driver_name,
        team_name: dbNode.properties.team_name,
        race_time: dbNode.properties.race_time,
        laps: dbNode.properties.laps,
        status: dbNode.properties.status,
        points: dbNode.properties.points,
    } as SessionResultNode
}
