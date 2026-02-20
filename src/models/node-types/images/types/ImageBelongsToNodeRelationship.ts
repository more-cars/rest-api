import type {ControllerNode} from "../../../../controllers/nodes/types/ControllerNode"

export type ImageBelongsToNodeRelationship = {
    image_id: number
    partner_node_id: number
    relationship_id: number
    relationship_name: string
    relationship_partner?: ControllerNode
    created_at: string
    updated_at: string
}
