import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        short_name: true,
        founded: true,
        defunct: true,
        organized_by: true,
        vehicle_type: true,
        country_code: true,
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
            name: true,
            short_name: true,
            founded: true,
            defunct: true,
            organized_by: true,
            vehicle_type: true,
            country_code: true,
        })
})
