import {describe, expect, test} from 'vitest'
import type {RacingSeriesInput} from "../../../../../../src/models/node-types/racing-series/types/RacingSeriesInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: RacingSeriesInput = {
            name: "   Formula 1  ",
            short_name: "   F1  ",
            founded: 1950,
            defunct: null,
            organized_by: "   FIA  ",
            vehicle_type: "   formula racing cars  ",
            country_code: "   US  ",
        }

        const result = unmarshalInputData(data, [
            'name',
            'short_name',
            'founded',
            'defunct',
            'organized_by',
            'vehicle_type',
            'country_code',
        ])

        expect(result)
            .toStrictEqual({
                name: "Formula 1",
                short_name: "F1",
                founded: 1950,
                defunct: null,
                organized_by: "FIA",
                vehicle_type: "formula racing cars",
                country_code: "US",
            })
    })
})
