import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-games/marshalling/unmarshalInputData"

/**
 * Requests are NOT rejected when they contain too much information.
 * The extraneous fields are simply ignored.
 */
test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
        name: "Forza Motorsport 7",
        release_year: 2017,
        developer: "Turn 10 Studios",
        publisher: "Microsoft Studios",
        my_property: "Hello",
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
