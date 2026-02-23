import {Node} from "neo4j-driver"
import {InputBrandCreate} from "../../../src/db/node-types/brands/types/InputBrandCreate"

export function mapBrand(oldNode: Node): InputBrandCreate {
    return {
        name: oldNode.properties.name,
        full_name: oldNode.properties.full_name,
        founded: oldNode.properties.founded,
        defunct: oldNode.properties.defunct,
        wmi: oldNode.properties.wmi,
        hsn: oldNode.properties.hsn,
    }
}