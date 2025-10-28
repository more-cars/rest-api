import {Node} from "neo4j-driver"
import type {InputSessionResultCreate} from "../../../src/db/nodes/session-results/types/InputSessionResultCreate"

export function mapSessionResult(oldNode: Node): InputSessionResultCreate {
    return {
        position: oldNode.properties.position,
        race_number: oldNode.properties.start_number,
        driver_name: oldNode.properties.driver_name,
        team_name: oldNode.properties.driver_name,
        race_time: oldNode.properties.date,
        laps: oldNode.properties.date,
        status: oldNode.properties.date,
        points: oldNode.properties.date,
    }
}
