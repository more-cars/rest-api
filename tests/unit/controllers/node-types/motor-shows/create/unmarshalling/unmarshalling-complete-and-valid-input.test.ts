import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"
import type {CreateMotorShowRawInput} from "../../../../../../../src/controllers/node-types/motor-shows/types/CreateMotorShowRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateMotorShowRawInput = {
        name: "2017 IAA Frankfurt",
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
            name: "2017 IAA Frankfurt",
            date_from: "2017-09-14",
            date_until: "2017-09-24",
            location: "Frankfurt",
            target_audience: "international",
            focus: "new cars",
            country_code: "DE",
        })
})
