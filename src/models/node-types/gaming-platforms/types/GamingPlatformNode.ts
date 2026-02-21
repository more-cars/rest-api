import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface GamingPlatformNode extends ModelNode {
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
