import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapSessionResult(oldNode: Node): DbInputData {
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
