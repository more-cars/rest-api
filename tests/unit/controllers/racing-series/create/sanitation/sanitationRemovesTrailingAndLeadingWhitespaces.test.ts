import {expect, test} from 'vitest'
import {sanitize} from "../../../../../../src/controllers/racing-series/create"
import {CreateRacingSeriesInput} from "../../../../../../src/models/racing-series/types/CreateRacingSeriesInput"

test('leading and trailing whitespaces are removed from all properties of type "string"', async () => {
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
