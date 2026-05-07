import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
        date_from: "2017-09-14",
        date_until: "2017-09-24",
        location: "Frankfurt",
        target_audience: "international",
        focus: "new cars",
        country_code: "DE",
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
            name: undefined,
            date_from: "2017-09-14",
            date_until: "2017-09-24",
            location: "Frankfurt",
            target_audience: "international",
            focus: "new cars",
            country_code: "DE",
        })
})
