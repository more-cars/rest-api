import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapMotorShow(oldNode: Node): DbInputData {
    return {
        name: oldNode.properties.name,
        date_from: oldNode.properties.date_from,
        date_until: oldNode.properties.date_to,
        location: oldNode.properties.location,
        target_audience: oldNode.properties.target,
        focus: oldNode.properties.focus,
        country_code: null,
    }
}
