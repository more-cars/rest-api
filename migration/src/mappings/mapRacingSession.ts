import {Node} from "neo4j-driver"
import type {InputRacingSessionCreate} from "../../../src/db/node-types/racing-sessions/types/InputRacingSessionCreate"

export function mapRacingSession(oldNode: Node): InputRacingSessionCreate {
    return {
        name: oldNode.properties.name,
        start_date: oldNode.properties.start_date,
        start_time: oldNode.properties.start_time,
        duration: oldNode.properties.duration, // TODO split
        duration_unit: oldNode.properties.duration_unit, // TODO split
        distance: oldNode.properties.duration, // TODO split
        distance_unit: oldNode.properties.duration_unit, // TODO split
    }
}
