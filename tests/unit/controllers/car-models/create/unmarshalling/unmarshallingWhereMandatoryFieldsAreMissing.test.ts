import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/carModels/unmarshal"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
        generation: 7,
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            built_from: undefined,
            built_to: undefined,
            generation: 7,
            internal_code: undefined,
            total_production: undefined,
        })
})
