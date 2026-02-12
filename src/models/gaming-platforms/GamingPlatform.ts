import {CreateGamingPlatformInput} from "./types/CreateGamingPlatformInput"
import {GamingPlatformNode} from "./types/GamingPlatformNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../db/nodes/gaming-platforms/createNode"
import {convertOutputData} from "./create/convertOutputData"
import {getNodeById} from "../../db/nodes/gaming-platforms/getNodeById"

export const GamingPlatform = {
    async create(data: CreateGamingPlatformInput): Promise<GamingPlatformNode> {
        const input = convertInputData(data)
        const result = await createNode(input)
        const output = convertOutputData(result)

        return output
    },

    async findById(id: number): Promise<false | GamingPlatformNode> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertOutputData(node)
    },
}
