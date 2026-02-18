export type RaceTrackResponse = {
    data: {
        id: number

        name: string
        opened: number | null
        closed: number | null
        type: string | null
        location: string | null
        geo_position: string | null

        created_at: string
        updated_at: string
    }
}
