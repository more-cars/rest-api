import {expect, test} from 'vitest'
import {CreateVideoRawInput} from "../../../../../../../src/controllers/node-types/videos/types/CreateVideoRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/videos/create"

test.each([
    [false, "NqsBncRslsg"],
    ["youtube", false],
])('validating a request where the fields have invalid data types', async (
    video_provider,
    external_id,
) => {
    const data: CreateVideoRawInput = {
        video_provider,
        external_id,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
