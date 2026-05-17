import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapRating(oldNode: Node): DbInputData {
    return {
        rating_value: oldNode.properties.rating,
        scale_minimum: oldNode.properties.scale_min,
        scale_maximum: oldNode.properties.scale_max,
        scale_direction: oldNode.properties.scale_direction,
    }
}
