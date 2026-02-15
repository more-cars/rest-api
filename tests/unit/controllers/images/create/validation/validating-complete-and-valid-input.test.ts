import {expect, test} from 'vitest'
import {CreateImageRawInput} from "../../../../../../src/controllers/images/types/CreateImageRawInput"
import {validate} from "../../../../../../src/controllers/images/create"

test('validating a complete and valid request', async () => {
    const data: CreateImageRawInput = {
        external_id: "54570839725",
        image_provider: "flickr",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
