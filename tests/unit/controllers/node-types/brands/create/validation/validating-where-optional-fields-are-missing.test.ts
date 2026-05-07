import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "BMW",
        full_name: undefined,
        founded: undefined,
        defunct: undefined,
        wmi: undefined,
        hsn: undefined,
        country_code: undefined,
    }

    const result = validateInputData(data, NodeType.Brand)

    expect(result)
        .toBeTruthy()
})
