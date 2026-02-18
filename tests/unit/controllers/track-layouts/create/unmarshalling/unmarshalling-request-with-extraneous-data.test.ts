import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/track-layouts/marshalling/unmarshalInputData"

/**
 * Requests are NOT rejected when they contain too much information.
 * The extraneous fields are simply ignored.
 */
test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
        name: "GP Circuit",
        year_from: 1967,
        year_to: 1999,
        length: 7.004,
        length_unit: "km",
        direction: "clockwise",
        elevation_change: 71,
        elevation_change_unit: "m",
        surface: "asphalt",
        my_property: "Hello",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "GP Circuit",
            year_from: 1967,
            year_to: 1999,
            length: 7.004,
            length_unit: "km",
            direction: "clockwise",
            elevation_change: 71,
            elevation_change_unit: "m",
            surface: "asphalt",
        })
})
