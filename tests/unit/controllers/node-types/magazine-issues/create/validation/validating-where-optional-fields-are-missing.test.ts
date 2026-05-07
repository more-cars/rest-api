import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        title: "Performance Car of the Year",
        consecutive_number: undefined,
        issue_number: undefined,
        issue_year: undefined,
        release_date: undefined,
        single_copy_price: undefined,
        single_copy_price_unit: undefined,
        pages: undefined,
    }

    const result = validateInputData(data, NodeType.MagazineIssue)

    expect(result)
        .toBeTruthy()
})
