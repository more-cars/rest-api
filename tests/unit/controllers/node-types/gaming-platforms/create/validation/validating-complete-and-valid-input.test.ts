import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a complete and valid request', async () => {
    const data = {
        name: "PlayStation 5",
        release_year: 2020,
        manufacturer: "Sony",
    }

    const result = validateInputData(data, NodeType.GamingPlatform)

    expect(result)
        .toBeTruthy()
})
