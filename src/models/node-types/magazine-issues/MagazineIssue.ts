import {CreateMagazineIssueInput} from "./types/CreateMagazineIssueInput"
import {MagazineIssueNode} from "./types/MagazineIssueNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/magazine-issues/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"

export const MagazineIssue = {
    async create(data: CreateMagazineIssueInput): Promise<MagazineIssueNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as MagazineIssueNode
    },
}
