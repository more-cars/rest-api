import {CreateMotorShowInput} from "./types/CreateMotorShowInput"
import {MotorShowNode} from "./types/MotorShowNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/motor-shows/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/motor-shows/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"

export const MotorShow = {
    async create(data: CreateMotorShowInput): Promise<MotorShowNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as MotorShowNode
    },

    async findById(id: number): Promise<MotorShowNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as MotorShowNode
    },
}
