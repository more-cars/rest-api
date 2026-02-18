import {expect, test} from 'vitest'
import {CreateImageRawInput} from "../../../../../../src/controllers/node-types/images/types/CreateImageRawInput"
import {validate} from "../../../../../../src/controllers/node-types/images/create"

test.each([
    [true, "flickr"],
    ["54570839725", true],
])('validating a request where the fields have invalid data types', async (
    external_id, image_provider
) => {
    const data: CreateImageRawInput = {
        external_id,
        image_provider,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
