import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapRacingEvent(oldNode: Node): DbInputData {
    return {
        name: oldNode.properties.name,
        round: oldNode.properties.round,
        date_from: oldNode.properties.date_from,
        date_to: oldNode.properties.date_to,
    }
}
