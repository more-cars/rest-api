import type {MagazineIssueNode as ModelMagazineIssueNode} from "../../../models/node-types/magazine-issues/types/MagazineIssueNode"
import type {MagazineIssueNode} from "./types/MagazineIssueNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertMagazineIssueModelNodeToControllerNode(modelNode: ModelMagazineIssueNode): MagazineIssueNode {
    return {
        node_type: ControllerNodeType.MagazineIssue,
        fields: {
            id: modelNode.attributes.id,
            title: modelNode.attributes.title,
            consecutive_number: modelNode.attributes.consecutive_number ?? null,
            issue_number: modelNode.attributes.issue_number ?? null,
            issue_year: modelNode.attributes.issue_year ?? null,
            release_date: modelNode.attributes.release_date ?? null,
            single_copy_price: modelNode.attributes.single_copy_price ?? null,
            single_copy_price_unit: modelNode.attributes.single_copy_price_unit ?? null,
            pages: modelNode.attributes.pages ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies MagazineIssueNode
}
