import type {ModelNode} from "../../../types/ModelNode"
import type {ModelNodeType} from "../../../types/ModelNodeType"

export interface RaceTrackNode extends ModelNode {
    node_type: ModelNodeType.RaceTrack,
    attributes: {
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
