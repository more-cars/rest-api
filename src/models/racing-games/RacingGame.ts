import {CreateRacingGameInput} from "./types/CreateRacingGameInput"
import {RacingGameNode} from "./types/RacingGameNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/racing-games/createNode"
import {convertOutputData} from "./create/convertOutputData"

export const RacingGame = {
    async create(data: CreateRacingGameInput): Promise<RacingGameNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },
}
