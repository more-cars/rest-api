import {Node} from "neo4j-driver"
import type {InputCompanyCreate} from "../../../src/db/node-types/companies/types/InputCompanyCreate"

export function mapCompany(oldNode: Node): InputCompanyCreate {
    return {
        name: oldNode.properties.name,
        founded: oldNode.properties.founded,
        defunct: oldNode.properties.defunct,
        headquarters_location: oldNode.properties.hq_city,
        legal_headquarters_location: oldNode.properties.legal_hq_city,
    }
}
