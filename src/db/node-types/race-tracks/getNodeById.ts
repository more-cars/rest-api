import {RaceTrackNode} from "./types/RaceTrackNode"
import {fetchNodeById} from "../../nodes/fetchNodeById"
import {DbNodeType} from "../../types/DbNodeType"

export async function getNodeById(id: number) {
    const node = await fetchNodeById(id, DbNodeType.RaceTrack)

    if (!node) {
        return false
    }

    return node as RaceTrackNode
}
