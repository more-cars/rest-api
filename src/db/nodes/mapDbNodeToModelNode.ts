import {Node} from "neo4j-driver"
import {BaseNode} from "../../types/BaseNode"

export function mapDbNodeToModelNode(dbNode: Node): BaseNode {
    const modelNode: BaseNode = {
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,
    }

    return modelNode
}
