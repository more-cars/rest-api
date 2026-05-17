import type {MagazineIssueInput} from "../types/MagazineIssueInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: MagazineIssueInput): DbInputData {
    return {
        title: data.title,
        consecutive_number: data.consecutive_number,
        issue_number: data.issue_number,
        issue_year: data.issue_year,
        release_date: data.release_date,
        single_copy_price: data.single_copy_price,
        single_copy_price_unit: data.single_copy_price_unit,
        pages: data.pages,
    }
}
