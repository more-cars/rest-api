import {describe, expect, test} from 'vitest'
import {CreateBrandRawInput} from "../../../../../src/controllers/brands/types/CreateBrandRawInput"
import {validate} from "../../../../../src/controllers/brands/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateBrandRawInput = {
            name: undefined,
            full_name: "Bayerische Motoren Werke",
            founded: 1916,
            defunct: 2222,
            wmi: "WBA",
            hsn: "0005",
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: CreateBrandRawInput = {
            name: "BMW",
            full_name: undefined,
            founded: undefined,
            defunct: undefined,
            wmi: undefined,
            hsn: undefined,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: CreateBrandRawInput = {
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
})
