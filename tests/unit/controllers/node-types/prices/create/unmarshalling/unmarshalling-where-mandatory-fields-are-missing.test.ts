import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/prices/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {}

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            price: undefined,
            price_year: undefined,
            currency_code: undefined,
            country_code: undefined
        })
})
