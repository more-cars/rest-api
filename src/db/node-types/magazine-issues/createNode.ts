import {InputMagazineIssueCreate} from "./types/InputMagazineIssueCreate"
import {MagazineIssueNode} from "./types/MagazineIssueNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertMagazineIssueNeo4jNodeToDbNode} from "./convertMagazineIssueNeo4jNodeToDbNode"

export async function createNode(data: InputMagazineIssueCreate): Promise<MagazineIssueNode> {
    const node = await createNeo4jNode(DbNodeType.MagazineIssue, data)

    return convertMagazineIssueNeo4jNodeToDbNode(node)
}
