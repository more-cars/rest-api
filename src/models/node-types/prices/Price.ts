import {CreatePriceInput} from "./types/CreatePriceInput"
import {PriceNode} from "./types/PriceNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/prices/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/prices/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"

export const Price = {
    async create(data: CreatePriceInput): Promise<PriceNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as PriceNode
    },

    async findById(id: number): Promise<PriceNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as PriceNode
    },
}
