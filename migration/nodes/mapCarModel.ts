import {Node} from "neo4j-driver"
import {InputCarModelCreate} from "../../src/db/nodes/car-models/types/InputCarModelCreate"

export function mapCarModel(node: Node): InputCarModelCreate {
    return {
        name: node.properties.name,
        built_from: node.properties.built_from,
        built_to: node.properties.built_to,
        generation: node.properties.generation_number,
        internal_code: node.properties.generation,
        total_production: node.properties.total_production,
    }
}