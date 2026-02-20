import {DbNode} from "../../../types/DbNode"
import {DbNodeType} from "../../../types/DbNodeType"

export interface RaceTrackNode extends DbNode {
    node_type: DbNodeType.RaceTrack,
    properties: {
        id: number
        created_at: string
        updated_at: string

        name: string
        opened: number | null
        closed: number | null
        type: string | null
        location: string | null
        geo_position: string | null
    }
}
