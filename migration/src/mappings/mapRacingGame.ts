import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapRacingGame(oldNode: Node): DbInputData {
    return {
        name: oldNode.properties.name,
        release_year: oldNode.properties.release_year,
        developer: oldNode.properties.developer,
        publisher: oldNode.properties.publisher,
    }
}
