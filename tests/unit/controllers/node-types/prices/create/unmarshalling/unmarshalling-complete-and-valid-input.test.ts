import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/prices/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        price: 59990,
        currency_code: "EUR",
        country_code: "DE",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            price: 59990,
            currency_code: "EUR",
            country_code: "DE",
        })
})
