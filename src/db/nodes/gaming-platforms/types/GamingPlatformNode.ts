import {DbNode} from "../../../types/DbNode"
import {DbNodeType} from "../../../types/DbNodeType"

export interface GamingPlatformNode extends DbNode {
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
