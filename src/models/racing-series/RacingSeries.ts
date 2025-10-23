import {CreateRacingSeriesInput} from "./types/CreateRacingSeriesInput"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/racing-series/createNode"
import {convertOutputData} from "./create/convertOutputData"

export class RacingSeries {
    static async create(data: CreateRacingSeriesInput): Promise<RacingSeriesNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }
}
