import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        video_provider: "youtube",
        external_id: "NqsBncRslsg",
    }

    const result = validateInputData(data, NodeType.Video, ['video_provider', 'external_id'])

    expect(result)
        .toBeTruthy()
})
