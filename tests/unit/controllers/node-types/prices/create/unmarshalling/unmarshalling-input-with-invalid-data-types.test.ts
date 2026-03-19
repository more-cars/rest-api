import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/prices/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        price: true,
        currency_code: true,
        country_code: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            price: true,
            currency_code: true,
            country_code: true,
        })
})
