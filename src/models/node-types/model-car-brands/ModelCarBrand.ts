import {CreateModelCarBrandInput} from "./types/CreateModelCarBrandInput"
import {ModelCarBrandNode} from "./types/ModelCarBrandNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/model-car-brands/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const ModelCarBrand = {
    async create(data: CreateModelCarBrandInput): Promise<ModelCarBrandNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ModelCarBrandNode
    },
}
