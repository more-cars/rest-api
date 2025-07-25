import {Node} from "neo4j-driver"
import {BrandNode} from "./types/BrandNode"

export function mapDbNodeToBrandNode(dbNode: Node): BrandNode {
    const node: BrandNode = {
        // system data
        id: dbNode.properties.mc_id,
        created_at: dbNode.properties.created_at,
        updated_at: dbNode.properties.updated_at,

        // user data
        name: dbNode.properties.name,
        full_name: dbNode.properties.full_name,
        founded: dbNode.properties.founded,
        defunct: dbNode.properties.defunct,
        wmi: dbNode.properties.wmi,
        hsn: dbNode.properties.hsn,
    }

    return node
}
