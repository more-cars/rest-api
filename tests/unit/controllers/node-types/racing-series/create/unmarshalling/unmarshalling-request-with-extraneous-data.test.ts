import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        name: "Formula 1",
        short_name: "F1",
        founded: 1950,
        defunct: null,
        organized_by: "FIA",
        vehicle_type: "formula racing cars",
        country_code: "US",
        my_property: "Hello",
    }

    const result = unmarshalInputData(data, [
        'name',
        'short_name',
        'founded',
        'defunct',
        'organized_by',
        'vehicle_type',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: "Formula 1",
            short_name: "F1",
            founded: 1950,
            defunct: null,
            organized_by: "FIA",
            vehicle_type: "formula racing cars",
            country_code: "US",
        })
})
