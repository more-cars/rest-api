import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapRacingSeries(oldNode: Node): DbInputData {
    return {
        name: oldNode.properties.name,
        short_name: oldNode.properties.short_name,
        founded: oldNode.properties.founded,
        defunct: oldNode.properties.defunct,
        organized_by: oldNode.properties.organization,
        vehicle_type: oldNode.properties.type,
        country_code: null,
    }
}
