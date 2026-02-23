import {Node} from "neo4j-driver"
import type {InputRaceTrackCreate} from "../../../src/db/node-types/race-tracks/types/InputRaceTrackCreate"

export function mapRaceTrack(oldNode: Node): InputRaceTrackCreate {
    return {
        name: oldNode.properties.name,
        opened: oldNode.properties.opened,
        closed: oldNode.properties.closed,
        type: oldNode.properties.type,
        location: oldNode.properties.location,
        geo_position: oldNode.properties.coordinates,
    }
}
