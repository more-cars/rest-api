import {expect, test} from 'vitest'
import {CreateRacingGameRawInput} from "../../../../../../src/controllers/node-types/racing-games/types/CreateRacingGameRawInput"
import {validate} from "../../../../../../src/controllers/node-types/racing-games/create"

test('validating a complete and valid request', async () => {
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
