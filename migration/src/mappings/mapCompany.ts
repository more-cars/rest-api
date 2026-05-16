import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapCompany(oldNode: Node): DbInputData {
    return {
        name: oldNode.properties.name,
        founded: oldNode.properties.founded,
        defunct: oldNode.properties.defunct,
        headquarters_location: oldNode.properties.hq_city,
        hq_country_code: null,
        legal_headquarters_location: oldNode.properties.legal_hq_city,
        legal_hq_country_code: null,
    }
}
