import {Node} from "neo4j-driver"
import type {InputCompanyCreate} from "../../src/db/nodes/companies/types/InputCompanyCreate"

export function mapCompany(node: Node): InputCompanyCreate {
    return {
        name: node.properties.name,
        founded: node.properties.founded,
        defunct: node.properties.defunct,
        headquarters_location: node.properties.hq_city,
        legal_headquarters_location: node.properties.legal_hq_city,
    }
}
