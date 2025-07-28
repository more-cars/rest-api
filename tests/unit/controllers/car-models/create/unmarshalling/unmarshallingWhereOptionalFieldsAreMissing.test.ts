import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/carModels/unmarshal"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "360 Modena",
    }

    const result = unmarshal(data)

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
