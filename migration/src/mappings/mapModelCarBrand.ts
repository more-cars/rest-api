import {Node} from "neo4j-driver"
import type {InputModelCarBrandCreate} from "../../../src/db/node-types/model-car-brands/types/InputModelCarBrandCreate"

export function mapModelCarBrand(oldNode: Node): InputModelCarBrandCreate {
    return {
        name: oldNode.properties.name,
        founded: oldNode.properties.founded,
        defunct: oldNode.properties.defunct,
    }
}
