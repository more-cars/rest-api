import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/racing-series/marshalling/unmarshalInputData"

/**
 * Requests are NOT rejected when they contain too much information.
 * The extraneous fields are simply ignored.
 */
test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
        name: "Formula 1",
        short_name: "F1",
        founded: 1950,
        defunct: null,
        organized_by: "FIA",
        vehicle_type: "formula racing cars",
        my_property: "Hello",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Formula 1",
            short_name: "F1",
            founded: 1950,
            defunct: null,
            organized_by: "FIA",
            vehicle_type: "formula racing cars",
        })
})
