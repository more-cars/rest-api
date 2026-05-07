import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        opened: true,
        closed: true,
        type: true,
        location: true,
        geo_position: true,
        country_code: true,
    }

    const result = unmarshalInputData(data, [
        'name',
        'opened',
        'closed',
        'type',
        'location',
        'geo_position',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: true,
            opened: true,
            closed: true,
            type: true,
            location: true,
            geo_position: true,
            country_code: true,
        })
})
