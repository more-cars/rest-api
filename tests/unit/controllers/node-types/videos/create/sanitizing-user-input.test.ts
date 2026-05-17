import {describe, expect, test} from 'vitest'
import {VideoInput} from "../../../../../../src/models/node-types/videos/types/VideoInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: VideoInput = {
            video_provider: "   youtube  ",
            external_id: "   NqsBncRslsg  ",
        }

        const result = unmarshalInputData(data, [
            'video_provider',
            'external_id',
        ])

        expect(result)
            .toStrictEqual({
                video_provider: "youtube",
                external_id: "NqsBncRslsg",
            })
    })
})
