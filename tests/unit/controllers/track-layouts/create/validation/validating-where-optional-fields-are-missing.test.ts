import {expect, test} from 'vitest'
import {CreateTrackLayoutRawInput} from "../../../../../../src/controllers/node-types/track-layouts/types/CreateTrackLayoutRawInput"
import {validate} from "../../../../../../src/controllers/node-types/track-layouts/create"

test('validating a valid request where optional fields are missing', async () => {
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
