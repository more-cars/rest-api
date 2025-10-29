import {describe, expect, test} from 'vitest'
import {CreateRacingEventRawInput} from "../../../../../src/controllers/racing-events/types/CreateRacingEventRawInput"
import {validate} from "../../../../../src/controllers/racing-events/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateRacingEventRawInput = {
            name: undefined,
            round: 8,
            date_from: "2025-05-25",
            date_to: "2025-05-27",
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: CreateRacingEventRawInput = {
            name: "GP Monaco 2025",
            round: undefined,
            date_from: undefined,
            date_to: undefined,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: CreateRacingEventRawInput = {
            name: "GP Monaco 2025",
            round: 8,
            date_from: "2025-05-25",
            date_to: "2025-05-27",
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
