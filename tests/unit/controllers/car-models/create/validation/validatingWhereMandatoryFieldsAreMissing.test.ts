import {validate} from "../../../../../../src/controllers/carModels/create"

test.skip('validating a request where mandatory fields are missing', async () => {
    const data: any = {
        full_name: "Bayerische Motoren Werke",
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
