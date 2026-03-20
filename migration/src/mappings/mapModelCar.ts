import {Node} from "neo4j-driver"
import type {InputModelCarCreate} from "../../../src/db/node-types/model-cars/types/InputModelCarCreate"

export function mapModelCar(oldNode: Node): InputModelCarCreate {
    return {
        name: oldNode.properties.name,
        product_code: oldNode.properties.code,
        release_year: oldNode.properties.release_year,
        scale: oldNode.properties.scale,
        series: oldNode.properties.series,
    }
}
