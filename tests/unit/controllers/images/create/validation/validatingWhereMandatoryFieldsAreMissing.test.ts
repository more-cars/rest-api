import {validate} from "../../../../../../src/controllers/images/create"
import {CreateImageRawInput} from "../../../../../../src/controllers/images/types/CreateImageRawInput"

test.skip('validating a request where mandatory fields are missing', async () => {
    const data: CreateImageRawInput = {
        external_id: undefined,
        image_provider: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
