import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {TrackLayoutNode} from "./types/TrackLayoutNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<TrackLayoutNode[]> {
    const nodes: TrackLayoutNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(Neo4jNodeType.TrackLayout, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToTrackLayoutNode(dbNode))
    })

    return nodes
}
