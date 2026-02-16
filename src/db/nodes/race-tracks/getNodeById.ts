import {RaceTrackNode} from "./types/RaceTrackNode"
import {fetchNodeFromDb} from "../fetchNodeFromDb"
import {mapDbNodeToRaceTrackNode} from "./mapDbNodeToRaceTrackNode"

export async function getNodeById(id: number): Promise<false | RaceTrackNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToRaceTrackNode(node)
}
