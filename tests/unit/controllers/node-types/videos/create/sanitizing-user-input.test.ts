import {describe, expect, test} from 'vitest'
import {CreateVideoInput} from "../../../../../../src/models/node-types/videos/types/CreateVideoInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateVideoInput = {
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
