import {RaceTrackNode as RaceTrackNodeInput} from "../../../db/nodes/race-tracks/types/RaceTrackNode"
import {RaceTrackNode} from "../types/RaceTrackNode"

export function convertOutputData(data: RaceTrackNodeInput): RaceTrackNode {
    return {
        id: data.id,
        name: data.name,
        opened: data.opened,
        closed: data.closed,
        type: data.type,
        location: data.location,
        geo_position: data.geo_position,
        created_at: data.created_at,
        updated_at: data.updated_at,
    } as RaceTrackNode
}
