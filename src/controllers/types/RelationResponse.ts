import {RelationType} from "./RelationType"
import type {ControllerNodeType} from "./ControllerNodeType"

export type RelationResponse = {
    links: {
        self: string
        related?: string
    }
    data: null | {
        type: ControllerNodeType
        id: number
        attributes: Record<string, string | number | boolean | null>
        relationship_id: number
        relationship_name: RelationType
        start_node: {
            node_type: string
            data: object & {
                id: number
                created_at: string
                updated_at: string
            }
        }
        partner_node: {
            node_type: string
            data: object & {
                id: number
                created_at: string
                updated_at: string
            }
        }
        created_at: string
        updated_at: string
    }
}
