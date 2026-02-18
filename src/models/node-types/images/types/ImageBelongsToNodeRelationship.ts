import type {BaseNode} from "../../../../controllers/nodes/types/BaseNode"

export type ImageBelongsToNodeRelationship = {
    image_id: number
    partner_node_id: number
    relationship_id: number
    relationship_name: string
    relationship_partner?: BaseNode
    created_at: string
    updated_at: string
}
