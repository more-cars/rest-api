import {CreateMagazineIssueRawInput} from "../types/CreateMagazineIssueRawInput"

// @ts-expect-error We cannot set a data type because we don't know what data the user actually provided.
export function unmarshalInputData(data): CreateMagazineIssueRawInput {
    return {
        title: data?.title,
        consecutive_number: data?.consecutive_number,
        issue_number: data?.issue_number,
        issue_year: data?.issue_year,
        release_date: data?.release_date,
        single_copy_price: data?.single_copy_price,
        single_copy_price_unit: data?.single_copy_price_unit,
        pages: data?.pages,
    } satisfies CreateMagazineIssueRawInput
}
