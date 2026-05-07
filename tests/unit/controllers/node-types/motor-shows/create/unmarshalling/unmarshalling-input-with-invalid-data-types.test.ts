import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        date_from: true,
        date_until: true,
        location: true,
        target_audience: true,
        focus: true,
        country_code: true,
    }

    const result = unmarshalInputData(data, [
        'name',
        'date_from',
        'date_until',
        'location',
        'target_audience',
        'focus',
        'country_code',
    ])

    expect(result)
        .toStrictEqual({
            name: true,
            date_from: true,
            date_until: true,
            location: true,
            target_audience: true,
            focus: true,
            country_code: true,
        })
})
