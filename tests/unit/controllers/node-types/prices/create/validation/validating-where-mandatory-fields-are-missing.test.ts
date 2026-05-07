import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        price: undefined,
        price_year: undefined,
        currency_code: undefined,
        country_code: undefined,
    }

    const result = validateInputData(data, NodeType.Price)

    expect(result)
        .toBeFalsy()
})
