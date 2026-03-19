import {CreatePriceInput} from "./types/CreatePriceInput"
import {PriceNode} from "./types/PriceNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/prices/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const Price = {
    async create(data: CreatePriceInput): Promise<PriceNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as PriceNode
    },
}
