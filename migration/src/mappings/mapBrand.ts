import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapBrand(oldNode: Node): DbInputData {
    return {
        name: oldNode.properties.name,
        full_name: oldNode.properties.full_name,
        founded: oldNode.properties.founded,
        defunct: oldNode.properties.defunct,
        wmi: oldNode.properties.wmi,
        hsn: oldNode.properties.hsn,
        country_code: null,
    }
}