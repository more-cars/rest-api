import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/carModels/unmarshal"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        name: "360 Modena",
        built_from: 1999,
        built_to: 2005,
        generation: null,
        internal_code: "F131",
        total_production: 16365,
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
            name: "360 Modena",
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        })
})
