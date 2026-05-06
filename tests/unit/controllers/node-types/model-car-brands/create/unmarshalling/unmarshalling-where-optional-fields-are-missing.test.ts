import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "Hot Wheels"
    }

    const result = unmarshalInputData(data, [
        'name',
        'founded',
        'defunct',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: "Hot Wheels",
            founded: undefined,
            defunct: undefined,
            country_code: undefined,
        })
})
