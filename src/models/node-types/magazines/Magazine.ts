import {CreateMagazineInput} from "./types/CreateMagazineInput"
import {MagazineNode} from "./types/MagazineNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/magazines/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const Magazine = {
    async create(data: CreateMagazineInput): Promise<MagazineNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as MagazineNode
    },
}
