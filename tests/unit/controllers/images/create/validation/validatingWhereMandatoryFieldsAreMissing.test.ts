import {validate} from "../../../../../../src/controllers/images/create"

test.skip('validating a request where mandatory fields are missing', async () => {
    const data: any = {
        description: "Engine: 3.3L B6",
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
