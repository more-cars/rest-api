import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a complete and valid request', async () => {
    const data = {
        video_provider: "youtube",
        external_id: "NqsBncRslsg",
    }

    const result = validateInputData(data, NodeType.Video)

    expect(result)
        .toBeTruthy()
})
