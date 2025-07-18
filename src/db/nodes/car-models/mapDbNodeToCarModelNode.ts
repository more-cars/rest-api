import {Node} from "neo4j-driver"
import {CarModelNode} from "./types/CarModelNode"

export function mapDbNodeToCarModelNode(dbNode: Node): CarModelNode {
    const node: CarModelNode = {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        built_from: dbNode.properties.built_from,
        built_to: dbNode.properties.built_to,
        generation: dbNode.properties.generation,
        internal_code: dbNode.properties.internal_code,
        total_production: dbNode.properties.total_production,
    }

    return node
}
