import {CreateMagazineIssueInput} from "../types/CreateMagazineIssueInput"
import {InputMagazineIssueCreate} from "../../../../db/node-types/magazine-issues/types/InputMagazineIssueCreate"

export function convertInputData(data: CreateMagazineIssueInput): InputMagazineIssueCreate {
    return {
        title: data.title,
        consecutive_number: data.consecutive_number,
        issue_number: data.issue_number,
        issue_year: data.issue_year,
        release_date: data.release_date,
        single_copy_price: data.single_copy_price,
        single_copy_price_unit: data.single_copy_price_unit,
        pages: data.pages,
    } satisfies InputMagazineIssueCreate
}
