import {InputRaceTrackCreate} from "./types/InputRaceTrackCreate"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRaceTrackNode} from "./mapDbNodeToRaceTrackNode"

export async function createNode(data: InputRaceTrackCreate): Promise<RaceTrackNode> {
    const node = await createNeo4jNode(DbNodeType.RaceTrack, data)

    return mapDbNodeToRaceTrackNode(node)
}
