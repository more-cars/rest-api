import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/model-car-brands/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
        founded: 1968,
        defunct: 2345,
        country_code: 'US',
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            founded: 1968,
            defunct: 2345,
            country_code: 'US',
        })
})
