import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {ProgrammeNode} from "./types/ProgrammeNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertProgrammeNeo4jNodeToDbNode} from "./convertProgrammeNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<ProgrammeNode[]> {
    const nodes: ProgrammeNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.Programme, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertProgrammeNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
