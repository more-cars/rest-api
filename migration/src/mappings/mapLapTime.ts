import {Node} from "neo4j-driver"
import type {InputLapTimeCreate} from "../../../src/db/nodes/lap-times/types/InputLapTimeCreate"

export function mapLapTime(oldNode: Node): InputLapTimeCreate {
    return {
        time: oldNode.properties.lap_time,
        driver_name: oldNode.properties.driver_name,
        date: oldNode.properties.date,
    }
}
