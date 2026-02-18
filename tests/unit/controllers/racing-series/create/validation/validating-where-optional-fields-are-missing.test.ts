import {expect, test} from 'vitest'
import {CreateRacingSeriesRawInput} from "../../../../../../src/controllers/node-types/racing-series/types/CreateRacingSeriesRawInput"
import {validate} from "../../../../../../src/controllers/node-types/racing-series/create"

test('validating a valid request where optional fields are missing', async () => {
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
