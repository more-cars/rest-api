import {describe, expect, test} from 'vitest'
import {CreateRacingGameInput} from "../../../../../src/models/racing-games/types/CreateRacingGameInput"
import {sanitize} from "../../../../../src/controllers/racing-games/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateRacingGameInput = {
            name: "   Forza Motorsport 7  ",
            release_year: 2017,
            developer: "   Turn 10 Studios  ",
            publisher: "   Microsoft Studios  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "Forza Motorsport 7",
                release_year: 2017,
                developer: "Turn 10 Studios",
                publisher: "Microsoft Studios",
            })
    })
})
