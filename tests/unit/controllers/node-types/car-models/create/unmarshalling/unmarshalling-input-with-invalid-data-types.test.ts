import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: "360 Modena",
        built_from: false,
        built_to: "2005",
        generation: null,
        internal_code: [1, 2, 3],
        total_production: 16365,
    }

    const result = unmarshalInputData(data, [
        'name',
        'built_from',
        'built_to',
        'generation',
        'internal_code',
        'total_production',
    ])

    expect(result)
        .toStrictEqual({
            name: "360 Modena",
            built_from: false,
            built_to: "2005",
            generation: null,
            internal_code: [1, 2, 3],
            total_production: 16365,
        })
})
