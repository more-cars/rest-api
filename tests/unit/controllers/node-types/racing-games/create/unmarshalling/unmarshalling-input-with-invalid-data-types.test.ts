import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        release_year: true,
        developer: true,
        publisher: true,
    }

    const result = unmarshalInputData(data, [
        'name',
        'release_year',
        'developer',
        'publisher',
    ])

    expect(result)
        .toStrictEqual({
            name: true,
            release_year: true,
            developer: true,
            publisher: true,
        })
})
