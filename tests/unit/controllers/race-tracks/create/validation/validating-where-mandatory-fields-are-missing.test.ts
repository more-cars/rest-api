import {expect, test} from 'vitest'
import {CreateRaceTrackRawInput} from "../../../../../../src/controllers/node-types/race-tracks/types/CreateRaceTrackRawInput"
import {validate} from "../../../../../../src/controllers/node-types/race-tracks/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateRaceTrackRawInput = {
        name: undefined,
        opened: 2000,
        closed: null,
        type: "permanent race track",
        location: "Klettwitz",
        geo_position: "51°32'0\"N 13°55'10\"E",
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
