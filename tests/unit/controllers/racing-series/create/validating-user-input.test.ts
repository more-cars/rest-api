import {describe, expect, test} from 'vitest'
import {CreateRacingSeriesRawInput} from "../../../../../src/controllers/racing-series/types/CreateRacingSeriesRawInput"
import {validate} from "../../../../../src/controllers/racing-series/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateRacingSeriesRawInput = {
            name: undefined,
            short_name: "F1",
            founded: 1950,
            defunct: null,
            organized_by: "FIA",
            vehicle_type: "formula racing cars",
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: CreateRacingSeriesRawInput = {
            name: "Formula 1",
            short_name: undefined,
            founded: undefined,
            defunct: undefined,
            organized_by: undefined,
            vehicle_type: undefined,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: CreateRacingSeriesRawInput = {
            name: "Formula 1",
            short_name: "F1",
            founded: 1950,
            defunct: null,
            organized_by: "FIA",
            vehicle_type: "formula racing cars",
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
