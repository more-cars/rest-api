import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        external_id: undefined,
        image_provider: undefined,
    }

    const result = validateInputData(data, NodeType.Image)

    expect(result)
        .toBeFalsy()
})
