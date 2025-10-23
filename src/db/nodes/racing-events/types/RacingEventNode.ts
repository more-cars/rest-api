export type RacingEventNode = {
    id: number
    created_at: string
    updated_at: string

    name: string
    round: number | null
    date_from: string | null
    date_to: string | null
}
