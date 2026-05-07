import {describe, expect, test} from 'vitest'
import {CreateRacingGameInput} from "../../../../../../src/models/node-types/racing-games/types/CreateRacingGameInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateRacingGameInput = {
            name: "   Forza Motorsport 7  ",
            release_year: 2017,
            developer: "   Turn 10 Studios  ",
            publisher: "   Microsoft Studios  ",
        }

        const result = unmarshalInputData(data, [
            'name',
            'release_year',
            'developer',
            'publisher',
        ])

        expect(result)
            .toStrictEqual({
                name: "Forza Motorsport 7",
                release_year: 2017,
                developer: "Turn 10 Studios",
                publisher: "Microsoft Studios",
            })
    })
})
