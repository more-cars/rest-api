import {expect, test} from 'vitest'
import {CreateRacingSeriesRawInput} from "../../../../../../src/controllers/node-types/racing-series/types/CreateRacingSeriesRawInput"
import {validate} from "../../../../../../src/controllers/node-types/racing-series/create"

test('validating a request where mandatory fields are missing', async () => {
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
