import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        name: "Forza Motorsport 7",
        release_year: 2017,
        developer: "Turn 10 Studios",
        publisher: "Microsoft Studios",
        my_property: "Hello",
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
