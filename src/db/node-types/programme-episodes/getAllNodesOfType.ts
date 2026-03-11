import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {ProgrammeEpisodeNode} from "./types/ProgrammeEpisodeNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertProgrammeEpisodeNeo4jNodeToDbNode} from "./convertProgrammeEpisodeNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<ProgrammeEpisodeNode[]> {
    const nodes: ProgrammeEpisodeNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.ProgrammeEpisode, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertProgrammeEpisodeNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
