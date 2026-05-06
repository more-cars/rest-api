import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
        founded: 1968,
        defunct: 2345,
        country_code: 'US',
    }

    const result = unmarshalInputData(data, [
        'name',
        'founded',
        'defunct',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: undefined,
            founded: 1968,
            defunct: 2345,
            country_code: 'US',
        })
})
