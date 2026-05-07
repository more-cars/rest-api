import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "Forza Motorsport 7",
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
            release_year: undefined,
            developer: undefined,
            publisher: undefined,
        })
})
