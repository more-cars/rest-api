export type NodeResponse = {
    type: string
    id: number
    attributes: {
        [key: string]: string | number | boolean | null
        created_at: string
        updated_at: string
    }
    links: {
        self: string
    }
}
