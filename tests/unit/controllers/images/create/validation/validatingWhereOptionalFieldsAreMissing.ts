import {validate} from "../../../../../../src/controllers/images/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: any = {
        external_id: "54570839725",
        image_provider: "flickr",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
