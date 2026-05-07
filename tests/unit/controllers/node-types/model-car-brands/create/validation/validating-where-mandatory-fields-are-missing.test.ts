import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        name: undefined,
        founded: 1968,
        defunct: null,
        country_code: "US",
    }

    const result = validateInputData(data, NodeType.ModelCarBrand)

    expect(result)
        .toBeFalsy()
})
