import {describe, expect, test} from 'vitest'
import {CreateRaceTrackInput} from "../../../../../../src/models/node-types/race-tracks/types/CreateRaceTrackInput"
import {sanitize} from "../../../../../../src/controllers/node-types/race-tracks/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateRaceTrackInput = {
            name: "   Lausitzring  ",
            opened: 2000,
            closed: null,
            type: "   permanent race track  ",
            location: "   Klettwitz  ",
            geo_position: "   51°32'0\"N 13°55'10\"E  ",
            country_code: "   DE  ",
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
                country_code: "DE",
            })
    })
})
