import {Node} from "neo4j-driver"
import type {InputMotorShowCreate} from "../../../src/db/node-types/motor-shows/types/InputMotorShowCreate"

export function mapMotorShow(oldNode: Node): InputMotorShowCreate {
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
