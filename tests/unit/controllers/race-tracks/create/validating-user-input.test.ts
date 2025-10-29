import {describe, expect, test} from 'vitest'
import {CreateRaceTrackRawInput} from "../../../../../src/controllers/race-tracks/types/CreateRaceTrackRawInput"
import {validate} from "../../../../../src/controllers/race-tracks/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
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

    test('optional fields are missing', async () => {
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

    test('providing valid input', async () => {
        const data: CreateRaceTrackRawInput = {
            name: "Lausitzring",
            opened: 2000,
            closed: null,
            type: "permanent race track",
            location: "Klettwitz",
            geo_position: "51°32'0\"N 13°55'10\"E",
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
