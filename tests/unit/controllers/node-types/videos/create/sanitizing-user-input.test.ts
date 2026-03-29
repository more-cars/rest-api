import {describe, expect, test} from 'vitest'
import {CreateVideoInput} from "../../../../../../src/models/node-types/videos/types/CreateVideoInput"
import {sanitize} from "../../../../../../src/controllers/node-types/videos/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateVideoInput = {
            video_provider: "   youtube  ",
            external_id: "   NqsBncRslsg  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                video_provider: "youtube",
                external_id: "NqsBncRslsg",
            })
    })
})
