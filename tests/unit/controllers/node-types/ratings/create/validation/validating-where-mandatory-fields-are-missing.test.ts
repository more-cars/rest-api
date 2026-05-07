import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        rating_value: undefined,
        scale_minimum: undefined,
        scale_maximum: undefined,
        scale_direction: undefined,
    }

    const result = validateInputData(data, NodeType.Rating)

    expect(result)
        .toBeFalsy()
})
