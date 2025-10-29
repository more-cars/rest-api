import {describe, expect, test} from 'vitest'
import {CreateTrackLayoutRawInput} from "../../../../../src/controllers/track-layouts/types/CreateTrackLayoutRawInput"
import {validate} from "../../../../../src/controllers/track-layouts/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateTrackLayoutRawInput = {
            name: undefined,
            year_from: 1967,
            year_to: 1999,
            length: 7.004,
            length_unit: "km",
            direction: "clockwise",
            elevation_change: 71,
            elevation_change_unit: "m",
            surface: "asphalt",
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: CreateTrackLayoutRawInput = {
            name: "GP Circuit",
            year_from: undefined,
            year_to: undefined,
            length: undefined,
            length_unit: undefined,
            direction: undefined,
            elevation_change: undefined,
            elevation_change_unit: undefined,
            surface: undefined,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: CreateTrackLayoutRawInput = {
            name: "GP Circuit",
            year_from: 1967,
            year_to: 1999,
            length: 7.004,
            length_unit: "km",
            direction: "clockwise",
            elevation_change: 71,
            elevation_change_unit: "m",
            surface: "asphalt",
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
