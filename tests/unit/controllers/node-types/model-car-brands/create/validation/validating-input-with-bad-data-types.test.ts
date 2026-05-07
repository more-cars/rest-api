import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [false, 1968, 0.01, "US"],
    ["Hot Wheels", false, 0.01, "US"],
    ["Hot Wheels", 1968, false, "US"],
    ["Hot Wheels", 1968, 0.01, false],
])('validating a request where the fields have invalid data types', async (
    name,
    founded,
    defunct,
    country_code,
) => {
    const data = {
        name,
        founded,
        defunct,
        country_code,
    }

    const result = validateInputData(data, NodeType.ModelCarBrand)

    expect(result)
        .toBeFalsy()
})
