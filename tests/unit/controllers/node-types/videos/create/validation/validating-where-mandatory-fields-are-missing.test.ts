import {expect, test} from 'vitest'
import {CreateVideoRawInput} from "../../../../../../../src/controllers/node-types/videos/types/CreateVideoRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/videos/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateVideoRawInput = {
        video_provider: undefined,
        external_id: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
