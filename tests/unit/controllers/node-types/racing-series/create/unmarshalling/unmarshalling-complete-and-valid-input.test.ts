import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data = {
        name: "Formula 1",
        short_name: "F1",
        founded: 1950,
        defunct: null,
        organized_by: "FIA",
        vehicle_type: "open-wheel-cars",
        country_code: "US",
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
            vehicle_type: "open-wheel-cars",
            country_code: "US",
        })
})
