import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "GP Circuit"
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
