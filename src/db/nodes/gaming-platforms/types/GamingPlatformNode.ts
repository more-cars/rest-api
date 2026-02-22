import {DbNodeType} from "../../../types/DbNodeType"

export type GamingPlatformNode = {
    node_type: DbNodeType.GamingPlatform,
    properties: {
        id: number
        created_at: string
        updated_at: string

        name: string
        release_year: number | null
        manufacturer: string | null
    }
}
