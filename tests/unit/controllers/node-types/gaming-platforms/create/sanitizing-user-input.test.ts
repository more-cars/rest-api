import {describe, expect, test} from 'vitest'
import {CreateGamingPlatformInput} from "../../../../../../src/models/node-types/gaming-platforms/types/CreateGamingPlatformInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateGamingPlatformInput = {
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
