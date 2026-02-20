import {RaceTrackNode as RaceTrackNodeInput} from "../../../../db/nodes/race-tracks/types/RaceTrackNode"
import {RaceTrackNode} from "../types/RaceTrackNode"

export function convertOutputData(data: RaceTrackNodeInput): RaceTrackNode {
    return {
        id: data.properties.id,
        name: data.properties.name,
        opened: data.properties.opened,
        closed: data.properties.closed,
        type: data.properties.type,
        location: data.properties.location,
        geo_position: data.properties.geo_position,
        created_at: data.properties.created_at,
        updated_at: data.properties.updated_at,
    } as RaceTrackNode
}
