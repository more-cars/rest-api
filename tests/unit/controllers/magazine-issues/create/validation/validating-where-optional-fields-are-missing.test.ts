import {expect, test} from 'vitest'
import {CreateMagazineIssueRawInput} from "../../../../../../src/controllers/node-types/magazine-issues/types/CreateMagazineIssueRawInput"
import {validate} from "../../../../../../src/controllers/node-types/magazine-issues/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateMagazineIssueRawInput = {
        title: "Performance Car of the Year",
        consecutive_number: undefined,
        issue_number: undefined,
        issue_year: undefined,
        release_date: undefined,
        single_copy_price: undefined,
        single_copy_price_unit: undefined,
        pages: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
