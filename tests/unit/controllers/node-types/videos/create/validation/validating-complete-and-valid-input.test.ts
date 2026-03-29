import {expect, test} from 'vitest'
import {CreateVideoRawInput} from "../../../../../../../src/controllers/node-types/videos/types/CreateVideoRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/videos/create"

test('validating a complete and valid request', async () => {
    const data: CreateVideoRawInput = {
        video_provider: "youtube",
        external_id: "NqsBncRslsg",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
