import {validate} from "../../../../../../src/controllers/images/create"

test.skip('validating a request where the data types are incorrect', async () => {
    const data: any = {
        external_id: 54570839725,
        image_provider: false,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
