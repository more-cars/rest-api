import {CreateMagazineInput} from "./types/CreateMagazineInput"
import {MagazineNode} from "./types/MagazineNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/magazines/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/magazines/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"

export const Magazine = {
    async create(data: CreateMagazineInput): Promise<MagazineNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as MagazineNode
    },

    async findById(id: number): Promise<MagazineNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as MagazineNode
    },
}
