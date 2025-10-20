import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RaceTrackNode} from "./types/RaceTrackNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRaceTrackNode} from "./mapDbNodeToRaceTrackNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<Array<RaceTrackNode>> {
    const nodes: Array<RaceTrackNode> = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.RaceTrack, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRaceTrackNode(dbNode))
    })

    return nodes
}
