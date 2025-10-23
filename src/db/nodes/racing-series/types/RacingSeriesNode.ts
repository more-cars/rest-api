export type RacingSeriesNode = {
    id: number
    created_at: string
    updated_at: string

    name: string
    short_name: string | null
    founded: number | null
    defunct: number | null
    organized_by: string | null
    vehicle_type: string | null
}
