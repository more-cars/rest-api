import {describe, expect, test} from 'vitest'
import {CreateImageRawInput} from "../../../../../src/controllers/images/types/CreateImageRawInput"
import {validate} from "../../../../../src/controllers/images/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateImageRawInput = {
            external_id: undefined,
            image_provider: undefined,
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: CreateImageRawInput = {
            external_id: "54570839725",
            image_provider: "flickr",
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: CreateImageRawInput = {
            external_id: "54570839725",
            image_provider: "flickr",
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test.each([
        // ["54570839725", "flickr"], // VALID data for reference
        [54570839725, "flickr"],
        [null, "flickr"],
        [false, "flickr"],
        ["54570839725", false],
        ["54570839725", null],
    ])('validating a request where the data types are incorrect', async (
        external_id, image_provider
    ) => {
        const data: CreateImageRawInput = {
            external_id, image_provider
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })
})
