import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/car-models/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the key is correct.
 */
test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: "360 Modena",
        built_from: false,
        built_to: "2005",
        generation: null,
        internal_code: [1, 2, 3],
        total_production: 16365,
    }

    const result = unmarshalInputData(data)

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
