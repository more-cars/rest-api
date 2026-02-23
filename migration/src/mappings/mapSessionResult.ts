import {Node} from "neo4j-driver"
import type {InputSessionResultCreate} from "../../../src/db/node-types/session-results/types/InputSessionResultCreate"

export function mapSessionResult(oldNode: Node): InputSessionResultCreate {
    return {
        position: oldNode.properties.position,
        race_number: oldNode.properties.start_number,
        driver_name: oldNode.properties.driver_name,
        team_name: oldNode.properties.team_name,
        race_time: oldNode.properties.race_time,
        laps: oldNode.properties.laps,
        status: oldNode.properties.status,
        points: oldNode.properties.points,
    }
}
