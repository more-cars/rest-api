import {RelationType} from "./RelationType"

export type RelationResponse = {
    data: {
        relationship_id: number
        relationship_name: RelationType
        relationship_partner: {
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
