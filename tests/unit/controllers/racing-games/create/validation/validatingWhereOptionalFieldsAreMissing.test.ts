import {expect, test} from 'vitest'
import {CreateRacingGameRawInput} from "../../../../../../src/controllers/racing-games/types/CreateRacingGameRawInput"
import {validate} from "../../../../../../src/controllers/racing-games/create"

test('validating a valid request where optional fields are missing', async () => {
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
