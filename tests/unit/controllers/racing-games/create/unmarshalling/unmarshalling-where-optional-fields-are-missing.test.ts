import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-games/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "Forza Motorsport 7",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Forza Motorsport 7",
            release_year: undefined,
            developer: undefined,
            publisher: undefined,
        })
})
