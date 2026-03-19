import {expect, test} from 'vitest'
import {CreatePriceRawInput} from "../../../../../../../src/controllers/node-types/prices/types/CreatePriceRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/prices/create"

test('validating a complete and valid request', async () => {
    const data: CreatePriceRawInput = {
        price: 59990,
        currency_code: "EUR",
        country_code: "DE",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
