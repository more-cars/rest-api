import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a complete and valid request', async () => {
    const data = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
        founded: 1916,
        defunct: 2222,
        wmi: "WBA",
        hsn: "0005",
        country_code: "DE",
    }

    const result = validateInputData(data, NodeType.Brand)

    expect(result)
        .toBeTruthy()
})
