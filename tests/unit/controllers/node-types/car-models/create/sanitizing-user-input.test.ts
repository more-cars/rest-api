import {describe, expect, test} from 'vitest'
import {CreateCarModelInput} from "../../../../../../src/models/node-types/car-models/types/CreateCarModelInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateCarModelInput = {
            name: "    360 Modena    ",
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131   ",
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
                built_from: 1999,
                built_to: 2005,
                generation: null,
                internal_code: "F131",
                total_production: 16365,
            })
    })
})
