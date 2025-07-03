import {CreateBrandRawInput} from "../../../../../../src/controllers/brands/types/CreateBrandRawInput"
import {validate} from "../../../../../../src/controllers/brands/create"

test.each([
    // ["BMW", "Bayerische Motoren Werke", 1916, null, "WBA", "0005"], // VALID data for reference
    [true, "Bayerische Motoren Werke", 1916, null, "WBA", "0005"],
    [123, "Bayerische Motoren Werke", 1916, null, "WBA", "0005"],
    ["BMW", false, 1916, null, "WBA", "0005"],
    ["BMW", "Bayerische Motoren Werke", "1916", null, "WBA", "0005"],
    ["BMW", "Bayerische Motoren Werke", 1916, false, "WBA", "0005"],
    ["BMW", "Bayerische Motoren Werke", 1916, null, [1, 2, 3], "0005"],
    ["BMW", "Bayerische Motoren Werke", 1916, null, "WBA", 5],
    ["BMW", "Bayerische Motoren Werke", 1916, null, null, 5],
])('validating a request where the data types are incorrect', async (
    name, full_name, founded, defunct, wmi, hsn
) => {
    const data: CreateBrandRawInput = {
        name, full_name, founded, defunct, wmi, hsn
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
