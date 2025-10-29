import {describe, expect, test} from 'vitest'
import {CreateLapTimeRawInput} from "../../../../../src/controllers/lap-times/types/CreateLapTimeRawInput"
import {validate} from "../../../../../src/controllers/lap-times/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateLapTimeRawInput = {
            time: undefined,
            driver_name: undefined,
            date: "1996-08-03",
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: CreateLapTimeRawInput = {
            time: "PT1M33.294S",
            driver_name: "Klaus Ludwig",
            date: undefined,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: CreateLapTimeRawInput = {
            time: "PT1M33.294S",
            driver_name: "Klaus Ludwig",
            date: "1996-08-03",
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
