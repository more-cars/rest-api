import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {TrackLayoutNode} from "./types/TrackLayoutNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToTrackLayoutNode} from "./mapDbNodeToTrackLayoutNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<Array<TrackLayoutNode>> {
    const nodes: Array<TrackLayoutNode> = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.TrackLayout, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToTrackLayoutNode(dbNode))
    })

    return nodes
}
