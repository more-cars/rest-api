import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RacingEventNode} from "./types/RacingEventNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertRacingEventNeo4jNodeToDbNode} from "./convertRacingEventNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RacingEventNode[]> {
    const nodes: RacingEventNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.RacingEvent, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertRacingEventNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
