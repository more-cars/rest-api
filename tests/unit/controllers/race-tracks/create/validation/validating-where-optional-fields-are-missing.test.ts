import {expect, test} from 'vitest'
import {CreateRaceTrackRawInput} from "../../../../../../src/controllers/node-types/race-tracks/types/CreateRaceTrackRawInput"
import {validate} from "../../../../../../src/controllers/node-types/race-tracks/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateRaceTrackRawInput = {
        name: "Lausitzring",
        opened: undefined,
        closed: undefined,
        type: undefined,
        location: undefined,
        geo_position: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
