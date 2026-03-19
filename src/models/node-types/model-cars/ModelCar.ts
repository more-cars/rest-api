import {CreateModelCarInput} from "./types/CreateModelCarInput"
import {ModelCarNode} from "./types/ModelCarNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/model-cars/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const ModelCar = {
    async create(data: CreateModelCarInput): Promise<ModelCarNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ModelCarNode
    },
}
