import {InputRaceTrackCreate} from "./types/InputRaceTrackCreate"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {createDbNode} from "../../nodes/createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRaceTrackNode} from "./mapDbNodeToRaceTrackNode"

export async function createNode(data: InputRaceTrackCreate): Promise<RaceTrackNode> {
    const node = await createDbNode(DbNodeType.RaceTrack, data)

    return mapDbNodeToRaceTrackNode(node)
}
