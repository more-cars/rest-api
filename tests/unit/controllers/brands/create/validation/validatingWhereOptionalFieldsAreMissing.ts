import {validate} from "../../../../../../src/controllers/brands/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
