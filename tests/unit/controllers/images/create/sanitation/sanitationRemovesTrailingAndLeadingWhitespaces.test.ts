import {sanitize} from "../../../../../../src/controllers/images/create"
import {CreateImageRawInput} from "../../../../../../src/controllers/images/types/CreateImageRawInput"

test.skip('leading and trailing whitespaces are removed', async () => {
    const data: CreateImageRawInput = {
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
