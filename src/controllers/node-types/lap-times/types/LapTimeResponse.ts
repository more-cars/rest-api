export type LapTimeResponse = {
    data: {
        id: number

        time: string
        driver_name: string
        date: string | null

        created_at: string
        updated_at: string
    }
}
