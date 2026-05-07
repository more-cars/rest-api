import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "PlayStation 5",
        release_year: undefined,
        manufacturer: undefined,
    }

    const result = validateInputData(data, NodeType.GamingPlatform)

    expect(result)
        .toBeTruthy()
})
