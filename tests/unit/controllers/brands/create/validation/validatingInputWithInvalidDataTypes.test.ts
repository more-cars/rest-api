import {CreateBrandRawInput} from "../../../../../../src/controllers/brands/types/CreateBrandRawInput"
import {validate} from "../../../../../../src/controllers/brands/create"

test('validating a request where the data types are incorrect', async () => {
    const data: CreateBrandRawInput = {
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
