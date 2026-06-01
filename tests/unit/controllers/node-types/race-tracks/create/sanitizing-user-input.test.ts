import {describe, expect, test} from 'vitest'
import type {RaceTrackInput} from "../../../../../../src/models/node-types/race-tracks/types/RaceTrackInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: RaceTrackInput = {
            name: "   Lausitzring  ",
            opened: 2000,
            closed: null,
            type: "   permanent-race-track  ",
            location: "   Klettwitz  ",
            geo_position: "   51°32’0”N 13°55’10”E  ",
            country_code: "   DE  ",
        }

        const result = unmarshalInputData(data, [
            'name',
            'opened',
            'closed',
            'type',
            'location',
            'geo_position',
            'country_code',
        ])

        expect(result)
            .toStrictEqual({
                name: "Lausitzring",
                opened: 2000,
                closed: null,
                type: "permanent-race-track",
                location: "Klettwitz",
                geo_position: "51°32’0”N 13°55’10”E",
                country_code: "DE",
            })
    })
})
