import {CreateModelCarInput} from "./types/CreateModelCarInput"
import {ModelCarNode} from "./types/ModelCarNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/model-cars/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/model-cars/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"

export const ModelCar = {
    async create(data: CreateModelCarInput): Promise<ModelCarNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ModelCarNode
    },

    async findById(id: number): Promise<ModelCarNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as ModelCarNode
    },
}
