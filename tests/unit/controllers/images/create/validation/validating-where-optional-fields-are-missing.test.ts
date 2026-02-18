import {expect, test} from 'vitest'
import {CreateImageRawInput} from "../../../../../../src/controllers/node-types/images/types/CreateImageRawInput"
import {validate} from "../../../../../../src/controllers/node-types/images/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateImageRawInput = {
        external_id: "54570839725",
        image_provider: "flickr",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
