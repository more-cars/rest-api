import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/track-layouts/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {}
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
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
