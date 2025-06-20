export type BrandNode = {
    id: number // TODO within the db layer this is "mc_id"
    created_at: string
    updated_at: string

    name: string
    full_name: string | null
    founded: number | null
    defunct: number | null
    wmi: string | null
    hsn: string | null
}
