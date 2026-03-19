import {expect, test} from 'vitest'
import {CreatePriceRawInput} from "../../../../../../../src/controllers/node-types/prices/types/CreatePriceRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/prices/create"

test.each([
    [false, "EUR", "DE"],
    [59990, false, "DE"],
    [59990, "EUR", false],
])('validating a request where the fields have invalid data types', async (
    price,
    currency_code,
    country_code,
) => {
    const data: CreatePriceRawInput = {
        price,
        currency_code,
        country_code,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
