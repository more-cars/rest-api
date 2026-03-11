import {CreateProgrammeInput} from "./types/CreateProgrammeInput"
import {ProgrammeNode} from "./types/ProgrammeNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/programmes/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const Programme = {
    async create(data: CreateProgrammeInput): Promise<ProgrammeNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ProgrammeNode
    },
}
