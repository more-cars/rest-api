import {Node} from "neo4j-driver"
import {RacingGameNode} from "./types/RacingGameNode"

export function mapDbNodeToRacingGameNode(dbNode: Node): RacingGameNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        release_year: dbNode.properties.release_year,
        developer: dbNode.properties.developer,
        publisher: dbNode.properties.publisher,
    } as RacingGameNode
}
