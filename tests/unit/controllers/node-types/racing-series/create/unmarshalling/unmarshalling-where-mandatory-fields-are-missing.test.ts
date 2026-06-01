import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
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
            name: undefined,
            short_name: "F1",
            founded: 1950,
            defunct: null,
            organized_by: "FIA",
            vehicle_type: "open-wheel-cars",
            country_code: "US",
        })
})
