import {Node} from "neo4j-driver"
import type {InputTrackLayoutCreate} from "../../../src/db/node-types/track-layouts/types/InputTrackLayoutCreate"

export function mapTrackLayout(oldNode: Node): InputTrackLayoutCreate {
    return {
        name: oldNode.properties.name,
        year_from: oldNode.properties.year_from,
        year_to: oldNode.properties.year_to,
        length: oldNode.properties.length,
        length_unit: oldNode.properties.length_unit,
        direction: oldNode.properties.direction,
        elevation_change: oldNode.properties.elevation_change,
        elevation_change_unit: oldNode.properties.elevation_change_unit,
        surface: oldNode.properties.surface,
    }
}
