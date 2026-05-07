import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [false, 2020, "EUR", "DE"],
    [59990, false, "EUR", "DE"],
    [59990, 2020, false, "DE"],
    [59990, 2020, "EUR", false],
])('validating a request where the fields have invalid data types', async (
    price,
    price_year,
    currency_code,
    country_code,
) => {
    const data = {
        price,
        price_year,
        currency_code,
        country_code,
    }

    const result = validateInputData(data, NodeType.Price)

    expect(result)
        .toBeFalsy()
})
