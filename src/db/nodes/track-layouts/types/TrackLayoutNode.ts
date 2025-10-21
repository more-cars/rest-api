export type TrackLayoutNode = {
    id: number
    created_at: string
    updated_at: string

    name: string
    year_from: number | null
    year_to: number | null
    length: number | null
    length_unit: string | null
    direction: string | null
    elevation_change: number | null
    elevation_change_unit: string | null
    surface: string | null
}
