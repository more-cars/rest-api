export type CompanyNode = {
    id: number
    created_at: string
    updated_at: string

    name: string
    founded: number | null
    defunct: number | null
    headquarters_location: string | null
    legal_headquarters_location: string | null
}
