import {CreateTrackLayoutInput} from "./types/CreateTrackLayoutInput"
import {TrackLayoutNode} from "./types/TrackLayoutNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/track-layouts/createNode"
import {convertOutputData} from "./create/convertOutputData"

export class TrackLayout {
    static async create(data: CreateTrackLayoutInput): Promise<TrackLayoutNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }
}
