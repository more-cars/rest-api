import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [false, "NqsBncRslsg"],
    ["youtube", false],
])('validating a request where the fields have invalid data types', async (
    video_provider,
    external_id,
) => {
    const data = {
        video_provider,
        external_id,
    }

    const result = validateInputData(data, NodeType.Video, ['video_provider', 'external_id'])

    expect(result)
        .toBeFalsy()
})
