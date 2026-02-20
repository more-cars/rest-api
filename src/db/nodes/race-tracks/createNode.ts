import {InputRaceTrackCreate} from "./types/InputRaceTrackCreate"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToRaceTrackNode} from "./mapDbNodeToRaceTrackNode"

export async function createNode(data: InputRaceTrackCreate): Promise<RaceTrackNode> {
    const node = await createDbNode(Neo4jNodeType.RaceTrack, data)

    return mapDbNodeToRaceTrackNode(node)
}
