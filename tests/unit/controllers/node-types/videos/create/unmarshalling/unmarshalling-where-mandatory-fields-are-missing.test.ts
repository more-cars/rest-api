import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/videos/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {}

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            video_provider: undefined,
            external_id: undefined,
        })
})
