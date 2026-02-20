import {ModelNodeType} from "../../../types/ModelNodeType"

export type GamingPlatformNode = {
    node_type: ModelNodeType.GamingPlatform,
    attributes: {
        id: number

        name: string
        release_year: number | null
        manufacturer: string | null

        created_at: string
        updated_at: string
    }
}
