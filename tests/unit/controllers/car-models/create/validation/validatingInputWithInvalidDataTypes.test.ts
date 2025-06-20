import {validate} from "../../../../../../src/controllers/carModels/create"

test.skip('validating a request where the data types are incorrect', async () => {
    const data: any = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
        founded: "1916",
        defunct: false,
        wmi: [1, 2, 3],
        hsn: 5,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
