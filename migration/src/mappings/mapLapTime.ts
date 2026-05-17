import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapLapTime(oldNode: Node): DbInputData {
    return {
        time: oldNode.properties.lap_time,
        driver_name: oldNode.properties.driver_name,
        date: oldNode.properties.date,
    }
}
