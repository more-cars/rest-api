import {describe, expect, test} from 'vitest'
import {CreateGamingPlatformRawInput} from "../../../../../src/controllers/gaming-platforms/types/CreateGamingPlatformRawInput"
import {validate} from "../../../../../src/controllers/gaming-platforms/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateGamingPlatformRawInput = {
            name: undefined,
            release_year: 2020,
            manufacturer: "Sony",
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: CreateGamingPlatformRawInput = {
            name: "PlayStation 5",
            release_year: undefined,
            manufacturer: undefined,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: CreateGamingPlatformRawInput = {
            name: "PlayStation 5",
            release_year: 2020,
            manufacturer: "Sony",
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
