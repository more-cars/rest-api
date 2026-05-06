import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "360 Modena",
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
            built_from: undefined,
            built_to: undefined,
            generation: undefined,
            internal_code: undefined,
            total_production: undefined,
        })
})
