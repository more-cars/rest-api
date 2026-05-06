import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
        built_from: 1999,
        built_to: 2005,
        generation: null,
        internal_code: "F131",
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
            name: undefined,
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        })
})
