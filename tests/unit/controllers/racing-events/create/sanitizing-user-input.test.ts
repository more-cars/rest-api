import {describe, expect, test} from 'vitest'
import {CreateRacingEventInput} from "../../../../../src/models/racing-events/types/CreateRacingEventInput"
import {sanitize} from "../../../../../src/controllers/racing-events/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateRacingEventInput = {
            name: "   GP Monaco 2025  ",
            round: 8,
            date_from: "   2025-05-25  ",
            date_to: "   2025-05-27  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "GP Monaco 2025",
                round: 8,
                date_from: "2025-05-25",
                date_to: "2025-05-27",
            })
    })
})
