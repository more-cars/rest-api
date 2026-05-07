import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, 2020, "Sony"],
    ["PlayStation 5", false, "Sony"],
    ["PlayStation 5", 2020, false],
])('validating a request where the fields have invalid data types', async (
    name, release_year, manufacturer
) => {
    const data = {
        name,
        release_year,
        manufacturer,
    }

    const result = validateInputData(data, NodeType.GamingPlatform)

    expect(result)
        .toBeFalsy()
})
