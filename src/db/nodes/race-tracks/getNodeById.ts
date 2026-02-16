import {RaceTrackNode} from "./types/RaceTrackNode"
import {fetchNodeById} from "../fetchNodeById"
import {mapDbNodeToRaceTrackNode} from "./mapDbNodeToRaceTrackNode"

export async function getNodeById(id: number): Promise<false | RaceTrackNode> {
    const node = await fetchNodeById(id)

    if (!node) {
        return false
    }

    return mapDbNodeToRaceTrackNode(node)
}
