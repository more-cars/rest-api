import {describe, expect, test} from 'vitest'
import {CreateGamingPlatformInput} from "../../../../../src/models/gaming-platforms/types/CreateGamingPlatformInput"
import {sanitize} from "../../../../../src/controllers/node-types/gaming-platforms/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateGamingPlatformInput = {
            name: "   PlayStation 5  ",
            release_year: 2020,
            manufacturer: "   Sony  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "PlayStation 5",
                release_year: 2020,
                manufacturer: "Sony",
            })
    })
})
