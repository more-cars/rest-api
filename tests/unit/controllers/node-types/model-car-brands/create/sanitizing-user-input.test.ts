import {describe, expect, test} from 'vitest'
import {CreateModelCarBrandInput} from "../../../../../../src/models/node-types/model-car-brands/types/CreateModelCarBrandInput"
import {sanitize} from "../../../../../../src/controllers/node-types/model-car-brands/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateModelCarBrandInput = {
            name: "   Hot Wheels  ",
            founded: 1968,
            defunct: null,
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "Hot Wheels",
                founded: 1968,
                defunct: null,
            })
    })
})
