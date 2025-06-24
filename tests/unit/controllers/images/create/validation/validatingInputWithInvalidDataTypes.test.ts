import {validate} from "../../../../../../src/controllers/images/create"
import {CreateImageRawInput} from "../../../../../../src/controllers/images/types/CreateImageRawInput"

test('validating a request where the data types are incorrect', async () => {
    const data: CreateImageRawInput = {
        external_id: 54570839725,
        image_provider: false,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
