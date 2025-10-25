import {Node} from "neo4j-driver"
import type {InputRacingEventCreate} from "../../../src/db/nodes/racing-events/types/InputRacingEventCreate"

export function mapRacingEvent(oldNode: Node): InputRacingEventCreate {
    return {
        name: oldNode.properties.name,
        round: oldNode.properties.round,
        date_from: oldNode.properties.date_from,
        date_to: oldNode.properties.date_to,
    }
}
