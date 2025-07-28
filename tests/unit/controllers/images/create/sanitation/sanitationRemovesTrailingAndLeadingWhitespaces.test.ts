import {expect, test} from 'vitest'
import {sanitize} from "../../../../../../src/controllers/images/create"
import {CreateImageInput} from "../../../../../../src/models/images/types/CreateImageInput"

test('leading and trailing whitespaces are removed', async () => {
    const data: CreateImageInput = {
        external_id: "    54570839725",
        image_provider: " flickr    ",
    }

    const result = sanitize(data)

    expect(result)
        .toStrictEqual({
            external_id: "54570839725",
            image_provider: "flickr",
        })
})
