import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/track-layouts/marshalling/unmarshalInputData"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
  name: "GP Circuit"
}

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "GP Circuit",
            year_from: undefined,
            year_to: undefined,
            length: undefined,
            length_unit: undefined,
            direction: undefined,
            elevation_change: undefined,
            elevation_change_unit: undefined,
            surface: undefined,
        })
})
