import {DbNodeType} from "../../../types/DbNodeType"

export type MagazineIssueNode = {
    node_type: DbNodeType.MagazineIssue,
    properties: {
        id: number
        created_at: string
        updated_at: string
        title: string
        consecutive_number: number | null
        issue_number: number | null
        issue_year: number | null
        release_date: string | null
        single_copy_price: number | null
        single_copy_price_unit: string | null
        pages: number | null
    }
}
