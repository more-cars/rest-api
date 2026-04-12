import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/race-tracks/marshalling/unmarshalInputData"
import type {CreateRaceTrackRawInput} from "../../../../../../../src/controllers/node-types/race-tracks/types/CreateRaceTrackRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateRaceTrackRawInput = {
        name: "Lausitzring",
        opened: 2000,
        closed: null,
        type: "permanent race track",
        location: "Klettwitz",
        geo_position: "51°32'0\"N 13°55'10\"E",
        country_code: "DE",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Lausitzring",
            opened: 2000,
            closed: null,
            type: "permanent race track",
            location: "Klettwitz",
            geo_position: "51°32'0\"N 13°55'10\"E",
            country_code: "DE",
        })
})
