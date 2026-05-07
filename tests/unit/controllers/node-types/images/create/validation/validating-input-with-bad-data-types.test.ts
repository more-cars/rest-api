import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, "flickr"],
    ["54570839725", true],
])('validating a request where the fields have invalid data types', async (
    external_id, image_provider
) => {
    const data = {
        external_id,
        image_provider,
    }

    const result = validateInputData(data, NodeType.Image, ['image_provider', 'external_id'])

    expect(result)
        .toBeFalsy()
})
