import {expect, test} from 'vitest'
import {CreateTrackLayoutRawInput} from "../../../../../../src/controllers/track-layouts/types/CreateTrackLayoutRawInput"
import {validate} from "../../../../../../src/controllers/track-layouts/create"

test('validating a complete and valid request', async () => {
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
