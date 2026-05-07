import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, 1967, 1999, 7.004, "km", "clockwise", 71, "m", "asphalt"],
    ["GP Circuit", false, 1999, 7.004, "km", "clockwise", 71, "m", "asphalt"],
    ["GP Circuit", 1967, false, 7.004, "km", "clockwise", 71, "m", "asphalt"],
    ["GP Circuit", 1967, 1999, false, "km", "clockwise", 71, "m", "asphalt"],
    ["GP Circuit", 1967, 1999, 7.004, false, "clockwise", 71, "m", "asphalt"],
    ["GP Circuit", 1967, 1999, 7.004, "km", false, 71, "m", "asphalt"],
    ["GP Circuit", 1967, 1999, 7.004, "km", "clockwise", false, "m", "asphalt"],
    ["GP Circuit", 1967, 1999, 7.004, "km", "clockwise", 71, false, "asphalt"],
    ["GP Circuit", 1967, 1999, 7.004, "km", "clockwise", 71, "m", false],
])('validating a request where the fields have invalid data types', async (
    name, year_from, year_to, length, length_unit, direction, elevation_change, elevation_change_unit, surface
) => {
    const data = {
        name,
        year_from,
        year_to,
        length,
        length_unit,
        direction,
        elevation_change,
        elevation_change_unit,
        surface,
    }

    const result = validateInputData(data, NodeType.TrackLayout)

    expect(result)
        .toBeFalsy()
})
