import {describe, expect, test} from 'vitest'
import {CreateRacingGameRawInput} from "../../../../../src/controllers/racing-games/types/CreateRacingGameRawInput"
import {validate} from "../../../../../src/controllers/racing-games/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateRacingGameRawInput = {
            name: undefined,
            release_year: 2017,
            developer: "Turn 10 Studios",
            publisher: "Microsoft Studios",
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: CreateRacingGameRawInput = {
            name: "Forza Motorsport 7",
            release_year: undefined,
            developer: undefined,
            publisher: undefined,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: CreateRacingGameRawInput = {
            name: "Forza Motorsport 7",
            release_year: 2017,
            developer: "Turn 10 Studios",
            publisher: "Microsoft Studios",
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })
})
