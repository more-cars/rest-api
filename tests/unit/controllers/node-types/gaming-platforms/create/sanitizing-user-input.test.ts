import {describe, expect, test} from 'vitest'
import type {GamingPlatformInput} from "../../../../../../src/models/node-types/gaming-platforms/types/GamingPlatformInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: GamingPlatformInput = {
            name: "   PlayStation 5  ",
            release_year: 2020,
            manufacturer: "   Sony  ",
        }

        const result = unmarshalInputData(data, [
            'name',
            'release_year',
            'manufacturer',
        ])

        expect(result)
            .toStrictEqual({
                name: "PlayStation 5",
                release_year: 2020,
                manufacturer: "Sony",
            })
    })
})
