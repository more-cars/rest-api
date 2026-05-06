import {describe, expect, test} from 'vitest'
import {CreateModelCarBrandInput} from "../../../../../../src/models/node-types/model-car-brands/types/CreateModelCarBrandInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateModelCarBrandInput = {
            name: "   Hot Wheels  ",
            founded: 1968,
            defunct: null,
            country_code: "   US  ",
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
                founded: 1968,
                defunct: null,
                country_code: "US",
            })
    })
})
