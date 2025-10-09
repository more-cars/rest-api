export type RelationshipResponse = {
    data: {
        relationship_id: number
        relationship_name: string
        relationship_partner: {
            node_type: string
            data: object
        }
        created_at: string
        updated_at: string
    }
}
