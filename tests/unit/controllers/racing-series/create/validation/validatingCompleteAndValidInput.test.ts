import {expect, test} from 'vitest'
import {CreateRacingSeriesRawInput} from "../../../../../../src/controllers/racing-series/types/CreateRacingSeriesRawInput"
import {validate} from "../../../../../../src/controllers/racing-series/create"

test('validating a complete and valid request', async () => {
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
