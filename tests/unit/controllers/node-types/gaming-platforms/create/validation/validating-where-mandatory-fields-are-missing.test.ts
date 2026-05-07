import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        name: undefined,
        release_year: 2020,
        manufacturer: "Sony",
    }

    const result = validateInputData(data, NodeType.GamingPlatform)

    expect(result)
        .toBeFalsy()
})
