import type {ModelNodeType} from "../../../types/ModelNodeType"

export type MagazineIssueNode = {
    node_type: ModelNodeType.MagazineIssue
    attributes: {
        id: number
        title: string
        consecutive_number: number | null
        issue_number: number | null
        issue_year: number | null
        release_date: string | null
        single_copy_price: number | null
        single_copy_price_unit: string | null
        pages: number | null
        created_at: string
        updated_at: string
    }
}
