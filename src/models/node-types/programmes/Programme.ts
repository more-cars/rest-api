import {CreateProgrammeInput} from "./types/CreateProgrammeInput"
import {ProgrammeNode} from "./types/ProgrammeNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/programmes/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/programmes/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"

export const Programme = {
    async create(data: CreateProgrammeInput): Promise<ProgrammeNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ProgrammeNode
    },

    async findById(id: number): Promise<ProgrammeNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as ProgrammeNode
    },
}
