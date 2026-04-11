import {expect, test} from 'vitest'
import {CreateImageRawInput} from "../../../../../../../src/controllers/node-types/images/types/CreateImageRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/images/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateImageRawInput = {
        image_provider: "wikimedia",
        external_id: "2011-03-04 Autosalon Genf 1391.JPG"
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
