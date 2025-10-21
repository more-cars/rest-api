import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/track-layouts/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the "keys" are correct.
 */
test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: true,
        year_from: true,
        year_to: true,
        length: true,
        length_unit: true,
        direction: true,
        elevation_change: true,
        elevation_change_unit: true,
        surface: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            year_from: true,
            year_to: true,
            length: true,
            length_unit: true,
            direction: true,
            elevation_change: true,
            elevation_change_unit: true,
            surface: true,
        })
})
