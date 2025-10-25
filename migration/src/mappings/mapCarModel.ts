import {Node} from "neo4j-driver"
import {InputCarModelCreate} from "../../../src/db/nodes/car-models/types/InputCarModelCreate"

export function mapCarModel(oldNode: Node): InputCarModelCreate {
    return {
        name: oldNode.properties.name,
        built_from: oldNode.properties.built_from,
        built_to: oldNode.properties.built_to,
        generation: oldNode.properties.generation_number,
        internal_code: oldNode.properties.generation,
        total_production: oldNode.properties.total_production,
    }
}