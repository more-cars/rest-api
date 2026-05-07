import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data = {
        image_provider: "flickr",
        external_id: "54570839725",
    }

    const result = unmarshalInputData(data, [
        'image_provider',
        'external_id',
    ])

    expect(result)
        .toStrictEqual({
            image_provider: "flickr",
            external_id: "54570839725",
        })
})
