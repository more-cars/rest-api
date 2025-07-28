import {expect, test} from 'vitest'
import {validate} from "../../../../../../src/controllers/images/create"
import {CreateImageRawInput} from "../../../../../../src/controllers/images/types/CreateImageRawInput"

test.each([
    // ["54570839725", "flickr"], // VALID data for reference
    [54570839725, "flickr"],
    [null, "flickr"],
    [false, "flickr"],
    ["54570839725", false],
    ["54570839725", null],
])('validating a request where the data types are incorrect', async (
    external_id, image_provider
) => {
    const data: CreateImageRawInput = {
        external_id, image_provider
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
