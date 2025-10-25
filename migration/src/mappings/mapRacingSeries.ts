import {Node} from "neo4j-driver"
import type {InputRacingSeriesCreate} from "../../../src/db/nodes/racing-series/types/InputRacingSeriesCreate"

export function mapRacingSeries(oldNode: Node): InputRacingSeriesCreate {
    return {
        name: oldNode.properties.name,
        short_name: oldNode.properties.short_name,
        founded: oldNode.properties.founded,
        defunct: oldNode.properties.defunct,
        organized_by: oldNode.properties.organization,
        vehicle_type: oldNode.properties.type,
    }
}
