import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "360 Modena",
        built_from: undefined,
        built_to: undefined,
        generation: undefined,
        internal_code: undefined,
        total_production: undefined,
    }

    const result = validateInputData(data, NodeType.CarModel)

    expect(result)
        .toBeTruthy()
})
