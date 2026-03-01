import {MagazineIssueNode as MagazineIssueNodeInput} from "../../../../db/node-types/magazine-issues/types/MagazineIssueNode"
import {MagazineIssueNode} from "../types/MagazineIssueNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertMagazineIssueDbNodeToModelNode(data: MagazineIssueNodeInput): MagazineIssueNode {
    return {
        node_type: ModelNodeType.MagazineIssue,
        attributes: {
            id: data.properties.id,
            title: data.properties.title,
            consecutive_number: data.properties.consecutive_number,
            issue_number: data.properties.issue_number,
            issue_year: data.properties.issue_year,
            release_date: data.properties.release_date,
            single_copy_price: data.properties.single_copy_price,
            single_copy_price_unit: data.properties.single_copy_price_unit,
            pages: data.properties.pages,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies MagazineIssueNode
}
