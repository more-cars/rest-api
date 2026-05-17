import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapModelCar(oldNode: Node): DbInputData {
    return {
        name: oldNode.properties.name,
        product_code: oldNode.properties.code,
        release_year: oldNode.properties.release_year,
        scale: oldNode.properties.scale,
        series: oldNode.properties.series,
    }
}
