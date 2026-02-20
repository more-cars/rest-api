import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {RaceTrackNode} from "./types/RaceTrackNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRaceTrackNode} from "./mapDbNodeToRaceTrackNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<RaceTrackNode[]> {
    const nodes: RaceTrackNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.RaceTrack, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToRaceTrackNode(dbNode))
    })

    return nodes
}
