import {InputMagazineIssueCreate} from "./types/InputMagazineIssueCreate"
import {MagazineIssueNode} from "./types/MagazineIssueNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputMagazineIssueCreate): Promise<MagazineIssueNode> {
    return await createNeo4jNode(DbNodeType.MagazineIssue, data) as MagazineIssueNode
}
