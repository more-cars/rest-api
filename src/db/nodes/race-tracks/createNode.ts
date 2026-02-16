import {InputRaceTrackCreate} from "./types/InputRaceTrackCreate"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRaceTrackNode} from "./mapDbNodeToRaceTrackNode"

export async function createNode(data: InputRaceTrackCreate): Promise<RaceTrackNode> {
    const node = await createDbNode(NodeTypeLabel.RaceTrack, data)

    return mapDbNodeToRaceTrackNode(node)
}
