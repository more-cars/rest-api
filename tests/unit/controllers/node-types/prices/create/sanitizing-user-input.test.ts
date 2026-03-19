import {describe, expect, test} from 'vitest'
import {CreatePriceInput} from "../../../../../../src/models/node-types/prices/types/CreatePriceInput"
import {sanitize} from "../../../../../../src/controllers/node-types/prices/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreatePriceInput = {
            price: 59990,
            currency_code: "   EUR  ",
            country_code: "   DE  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                price: 59990,
                currency_code: "EUR",
                country_code: "DE",
            })
    })
})
