import {Node} from "neo4j-driver"
import {InputBrandCreate} from "../../src/db/nodes/brands/types/InputBrandCreate"

export function mapBrand(node: Node): InputBrandCreate {
    return {
        name: node.properties.name,
        full_name: node.properties.full_name,
        founded: node.properties.founded,
        defunct: node.properties.defunct,
        wmi: node.properties.wmi,
        hsn: node.properties.hsn,
    }
}