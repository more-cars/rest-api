import {expect, test} from 'vitest'
import {CreatePriceRawInput} from "../../../../../../../src/controllers/node-types/prices/types/CreatePriceRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/prices/create"

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
    const data: CreatePriceRawInput = {
        price,
        price_year,
        currency_code,
        country_code,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
