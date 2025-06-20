import {validate} from "../../../../../../src/controllers/carModels/create"

/**
 * @group happyPath
 */
test('validating a complete and valid request', async () => {
    const data: any = {
        name: "BMW",
        full_name: "Bayerische Motoren Werke",
        founded: 1916,
        defunct: 2222,
        wmi: "WBA",
        hsn: "0005",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
