import {Node} from "neo4j-driver"
import {LapTimeNode} from "./types/LapTimeNode"

export function mapDbNodeToLapTimeNode(dbNode: Node): LapTimeNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        time: dbNode.properties.time,
        driver_name: dbNode.properties.driver_name,
        date: dbNode.properties.date,
    } as LapTimeNode
}
