import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapGamingPlatform(oldNode: Node): DbInputData {
    return {
        name: oldNode.properties.name,
        release_year: oldNode.properties.release_year,
        manufacturer: oldNode.properties.company,
    }
}
