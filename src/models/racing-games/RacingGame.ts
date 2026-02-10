import {CreateRacingGameInput} from "./types/CreateRacingGameInput"
import {RacingGameNode} from "./types/RacingGameNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/racing-games/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/racing-games/getNodeById"

export const RacingGame = {
    async create(data: CreateRacingGameInput): Promise<RacingGameNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | RacingGameNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },
}
