import {InputRatingCreate} from "./types/InputRatingCreate"
import {RatingNode} from "./types/RatingNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputRatingCreate): Promise<RatingNode> {
    return await createNeo4jNode(DbNodeType.Rating, data) as RatingNode
}
