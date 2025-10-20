import {expect, test} from 'vitest'
import {sanitize} from "../../../../../../src/controllers/race-tracks/create"
import {CreateRaceTrackInput} from "../../../../../../src/models/race-tracks/types/CreateRaceTrackInput"

test('leading and trailing whitespaces are removed from all properties of type "string"', async () => {
    const data: CreateRaceTrackInput = {
        name: "   Lausitzring  ",
        opened: 2000,
        closed: null,
        type: "   permanent race track  ",
        location: "   Klettwitz  ",
        geo_position: "   51°32'0\"N 13°55'10\"E  ",
    }

    const result = sanitize(data)

    expect(result)
        .toStrictEqual({
            name: "Lausitzring",
            opened: 2000,
            closed: null,
            type: "permanent race track",
            location: "Klettwitz",
            geo_position: "51°32'0\"N 13°55'10\"E",
        })
})
