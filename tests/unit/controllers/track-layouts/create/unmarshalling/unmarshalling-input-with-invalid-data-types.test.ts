import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/track-layouts/marshalling/unmarshalInputData"

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
