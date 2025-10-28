import {describe, expect, test} from 'vitest'
import {CreateTrackLayoutInput} from "../../../../../src/models/track-layouts/types/CreateTrackLayoutInput"
import {sanitize} from "../../../../../src/controllers/track-layouts/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateTrackLayoutInput = {
            name: "   GP Circuit  ",
            year_from: 1967,
            year_to: 1999,
            length: 7.004,
            length_unit: "   km  ",
            direction: "   clockwise  ",
            elevation_change: 71,
            elevation_change_unit: "   m  ",
            surface: "   asphalt  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "GP Circuit",
                year_from: 1967,
                year_to: 1999,
                length: 7.004,
                length_unit: "km",
                direction: "clockwise",
                elevation_change: 71,
                elevation_change_unit: "m",
                surface: "asphalt",
            })
    })
})
