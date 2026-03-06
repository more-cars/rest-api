import {InputRatingCreate} from "./types/InputRatingCreate"
import {RatingNode} from "./types/RatingNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertRatingNeo4jNodeToDbNode} from "./convertRatingNeo4jNodeToDbNode"

export async function createNode(data: InputRatingCreate): Promise<RatingNode> {
    const node = await createNeo4jNode(DbNodeType.Rating, data)

    return convertRatingNeo4jNodeToDbNode(node)
}
