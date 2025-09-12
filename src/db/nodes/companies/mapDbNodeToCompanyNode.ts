import {Node} from "neo4j-driver"
import {CompanyNode} from "./types/CompanyNode"

export function mapDbNodeToCompanyNode(dbNode: Node): CompanyNode {
    return {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        founded: dbNode.properties.founded,
        defunct: dbNode.properties.defunct,
        headquarters_location: dbNode.properties.headquarters_location,
        legal_headquarters_location: dbNode.properties.legal_headquarters_location,
    } as CompanyNode
}
