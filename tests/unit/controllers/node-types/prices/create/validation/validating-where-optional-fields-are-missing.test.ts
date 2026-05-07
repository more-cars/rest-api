import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        price: 59990,
        price_year: 2020,
        currency_code: "EUR",
        country_code: "DE",
    }

    const result = validateInputData(data, NodeType.Price)

    expect(result)
        .toBeTruthy()
})
