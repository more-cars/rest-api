import {expect, test} from 'vitest'
import {CreateRacingSeriesRawInput} from "../../../../../../src/controllers/racing-series/types/CreateRacingSeriesRawInput"
import {validate} from "../../../../../../src/controllers/racing-series/create"

test.each([
    [true, "F1", 1950, 2345, "FIA", "formula racing cars"],
    ["Formula 1", false, 1950, 2345, "FIA", "formula racing cars"],
    ["Formula 1", "F1", false, 2345, "FIA", "formula racing cars"],
    ["Formula 1", "F1", 1950, false, "FIA", "formula racing cars"],
    ["Formula 1", "F1", 1950, 2345, false, "formula racing cars"],
    ["Formula 1", "F1", 1950, 2345, "FIA", false],
])('validating a request where the fields have invalid data types', async (
    name, short_name, founded, defunct, organized_by, vehicle_type
) => {
    const data: CreateRacingSeriesRawInput = {
        name,
        short_name,
        founded,
        defunct,
        organized_by,
        vehicle_type,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
