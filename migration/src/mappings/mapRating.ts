import {Node} from "neo4j-driver"
import type {InputRatingCreate} from "../../../src/db/node-types/ratings/types/InputRatingCreate"

export function mapRating(oldNode: Node): InputRatingCreate {
    return {
        rating_value: oldNode.properties.rating,
        scale_minimum: oldNode.properties.scale_min,
        scale_maximum: oldNode.properties.scale_max,
        scale_direction: oldNode.properties.scale_direction,
    }
}
