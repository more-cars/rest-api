export type CarModelNode = {
    id: number // TODO within the db layer this is "mc_id"
    created_at: string
    updated_at: string

    name: string
    built_from: number | null
    built_to: number | null
    generation: number | null
    internal_code: string | null
    total_production: number | null
}
