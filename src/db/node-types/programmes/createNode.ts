import {InputProgrammeCreate} from "./types/InputProgrammeCreate"
import {ProgrammeNode} from "./types/ProgrammeNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertProgrammeNeo4jNodeToDbNode} from "./convertProgrammeNeo4jNodeToDbNode"

export async function createNode(data: InputProgrammeCreate): Promise<ProgrammeNode> {
    const node = await createNeo4jNode(DbNodeType.Programme, data)

    return convertProgrammeNeo4jNodeToDbNode(node)
}
