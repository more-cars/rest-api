import {InputRaceTrackCreate} from "./types/InputRaceTrackCreate"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputRaceTrackCreate): Promise<RaceTrackNode> {
    return await createNeo4jNode(DbNodeType.RaceTrack, data) as RaceTrackNode
}
