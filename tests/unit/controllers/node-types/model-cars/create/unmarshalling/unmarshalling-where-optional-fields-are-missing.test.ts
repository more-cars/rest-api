import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/model-cars/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "BMW 2002"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "BMW 2002",
            product_code: undefined,
            release_year: undefined,
            scale: undefined,
            series: undefined
        })
})
