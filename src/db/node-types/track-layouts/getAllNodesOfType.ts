import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {TrackLayoutNode} from "./types/TrackLayoutNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<TrackLayoutNode[]> {
    const nodes: TrackLayoutNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.TrackLayout, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToTrackLayoutNode(dbNode))
    })

    return nodes
}
