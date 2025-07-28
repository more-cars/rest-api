import {expect, test} from 'vitest'
import {unmarshal} from "../../../../../../src/controllers/images/unmarshal"

/**
 * @group happyPath
 */
test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        external_id: "54570839725",
        image_provider: "flickr",
    }

    const result = unmarshal(data)

    expect(result)
        .toStrictEqual({
            external_id: "54570839725",
            image_provider: "flickr",
        })
})
