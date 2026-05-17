export type RevisionInput = {
    node_type: string
    node_id: number
    node_created_at: string
    node_updated_at: string
    [key: string]: string | number | boolean | null | undefined
}
