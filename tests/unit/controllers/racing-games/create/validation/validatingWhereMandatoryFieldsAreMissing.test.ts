import {expect, test} from 'vitest'
import {CreateRacingGameRawInput} from "../../../../../../src/controllers/racing-games/types/CreateRacingGameRawInput"
import {validate} from "../../../../../../src/controllers/racing-games/create"

test('validating a request where mandatory fields are missing', async () => {
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
