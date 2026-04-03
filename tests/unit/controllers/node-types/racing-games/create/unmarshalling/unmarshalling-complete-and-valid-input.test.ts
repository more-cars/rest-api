import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/racing-games/marshalling/unmarshalInputData"
import type {CreateRacingGameRawInput} from "../../../../../../../src/controllers/node-types/racing-games/types/CreateRacingGameRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateRacingGameRawInput = {
        name: "Forza Motorsport 7",
        release_year: 2017,
        developer: "Turn 10 Studios",
        publisher: "Microsoft Studios",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Forza Motorsport 7",
            release_year: 2017,
            developer: "Turn 10 Studios",
            publisher: "Microsoft Studios",
        })
})
