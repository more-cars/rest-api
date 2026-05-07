import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
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

    const result = unmarshalInputData(data, [
        'name',
        'year_from',
        'year_to',
        'length',
        'length_unit',
        'direction',
        'elevation_change',
        'elevation_change_unit',
        'surface',
    ])

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
