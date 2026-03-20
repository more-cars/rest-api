import {expect, test} from 'vitest'
import {CreatePriceRawInput} from "../../../../../../../src/controllers/node-types/prices/types/CreatePriceRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/prices/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreatePriceRawInput = {
        price: undefined,
        price_year: undefined,
        currency_code: undefined,
        country_code: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
