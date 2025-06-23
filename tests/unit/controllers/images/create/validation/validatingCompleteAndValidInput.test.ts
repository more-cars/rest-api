import {validate} from "../../../../../../src/controllers/images/create"

/**
 * @group happyPath
 */
test('validating a complete and valid request', async () => {
    const data: any = {
        external_id: "54570839725",
        image_provider: "flickr",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
