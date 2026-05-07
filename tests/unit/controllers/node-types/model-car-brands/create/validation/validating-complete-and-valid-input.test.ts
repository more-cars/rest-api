import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a complete and valid request', async () => {
    const data = {
        name: "Hot Wheels",
        founded: 1968,
        defunct: null,
        country_code: "US",
    }

    const result = validateInputData(data, NodeType.ModelCarBrand)

    expect(result)
        .toBeTruthy()
})
