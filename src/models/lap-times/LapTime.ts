import {CreateLapTimeInput} from "./types/CreateLapTimeInput"
import {LapTimeNode} from "./types/LapTimeNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/lap-times/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/lap-times/getNodeById"

export class LapTime {
    static async create(data: CreateLapTimeInput): Promise<LapTimeNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    }

    static async findById(id: number): Promise<false | LapTimeNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    }
}
