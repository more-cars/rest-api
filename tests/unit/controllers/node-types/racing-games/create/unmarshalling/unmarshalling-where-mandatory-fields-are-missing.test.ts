import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
        release_year: 2017,
        developer: "Turn 10 Studios",
        publisher: "Microsoft Studios",
    }

    const result = unmarshalInputData(data, [
        'name',
        'release_year',
        'developer',
        'publisher',
    ])

    expect(result)
        .toStrictEqual({
            name: undefined,
            release_year: 2017,
            developer: "Turn 10 Studios",
            publisher: "Microsoft Studios",
        })
})
