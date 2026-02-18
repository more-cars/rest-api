import {describe, expect, test} from 'vitest'
import {CreateRacingSeriesInput} from "../../../../../src/models/node-types/racing-series/types/CreateRacingSeriesInput"
import {sanitize} from "../../../../../src/controllers/node-types/racing-series/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateRacingSeriesInput = {
            name: "   Formula 1  ",
            short_name: "   F1  ",
            founded: 1950,
            defunct: null,
            organized_by: "   FIA  ",
            vehicle_type: "   formula racing cars  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "Formula 1",
                short_name: "F1",
                founded: 1950,
                defunct: null,
                organized_by: "FIA",
                vehicle_type: "formula racing cars",
            })
    })
})
