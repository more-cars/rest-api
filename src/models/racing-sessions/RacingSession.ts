import {CreateRacingSessionInput} from "./types/CreateRacingSessionInput"
import {RacingSessionNode} from "./types/RacingSessionNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/racing-sessions/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/racing-sessions/getNodeById"

export class RacingSession {
    static async create(data: CreateRacingSessionInput): Promise<RacingSessionNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | RacingSessionNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }
}
