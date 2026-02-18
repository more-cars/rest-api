import {expect, test} from 'vitest'
import {CreateRacingGameRawInput} from "../../../../../../src/controllers/node-types/racing-games/types/CreateRacingGameRawInput"
import {validate} from "../../../../../../src/controllers/node-types/racing-games/create"

test.each([
    [true, 2017, "Turn 10 Studios", "Microsoft Studios"],
    ["Forza Motorsport 7", false, "Turn 10 Studios", "Microsoft Studios"],
    ["Forza Motorsport 7", 2017, false, "Microsoft Studios"],
    ["Forza Motorsport 7", 2017, "Turn 10 Studios", false],
])('validating a request where the fields have invalid data types', async (
    name, release_year, developer, publisher
) => {
    const data: CreateRacingGameRawInput = {
        name,
        release_year,
        developer,
        publisher,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
