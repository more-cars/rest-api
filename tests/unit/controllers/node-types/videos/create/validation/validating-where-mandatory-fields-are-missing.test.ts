import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        video_provider: undefined,
        external_id: undefined,
    }

    const result = validateInputData(data, NodeType.Video, ['video_provider', 'external_id'])

    expect(result)
        .toBeFalsy()
})
