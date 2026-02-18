import {expect, test} from 'vitest'
import {CreateImageRawInput} from "../../../../../../src/controllers/node-types/images/types/CreateImageRawInput"
import {validate} from "../../../../../../src/controllers/node-types/images/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateImageRawInput = {
        external_id: undefined,
        image_provider: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
