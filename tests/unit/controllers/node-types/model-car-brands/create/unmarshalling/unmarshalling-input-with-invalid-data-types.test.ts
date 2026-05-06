import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        founded: true,
        defunct: true,
        country_code: true,
    }

    const result = unmarshalInputData(data, [
        'name',
        'founded',
        'defunct',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: true,
            founded: true,
            defunct: true,
            country_code: true,
        })
})
