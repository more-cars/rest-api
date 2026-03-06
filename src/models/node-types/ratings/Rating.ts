import {CreateRatingInput} from "./types/CreateRatingInput"
import {RatingNode} from "./types/RatingNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/ratings/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const Rating = {
    async create(data: CreateRatingInput): Promise<RatingNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as RatingNode
    },
}
