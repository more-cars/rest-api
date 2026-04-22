import {InputProgrammeCreate} from "./types/InputProgrammeCreate"
import {ProgrammeNode} from "./types/ProgrammeNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputProgrammeCreate): Promise<ProgrammeNode> {
    return await createNeo4jNode(DbNodeType.Programme, data) as ProgrammeNode
}
