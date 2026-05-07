import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "Formula 1"
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
            short_name: undefined,
            founded: undefined,
            defunct: undefined,
            organized_by: undefined,
            vehicle_type: undefined,
            country_code: undefined,
        })
})
