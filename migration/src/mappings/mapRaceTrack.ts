import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapRaceTrack(oldNode: Node): DbInputData {
    return {
        name: oldNode.properties.name,
        opened: oldNode.properties.opened,
        closed: oldNode.properties.closed,
        type: oldNode.properties.type,
        location: oldNode.properties.location,
        geo_position: oldNode.properties.coordinates,
        country_code: null,
    }
}
