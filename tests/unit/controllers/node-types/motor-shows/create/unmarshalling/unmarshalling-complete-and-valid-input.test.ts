import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/motor-shows/marshalling/unmarshalInputData"
import type {CreateMotorShowRawInput} from "../../../../../../../src/controllers/node-types/motor-shows/types/CreateMotorShowRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateMotorShowRawInput = {
        name: "2017 IAA Frankfurt",
        date_from: "2017-09-14",
        date_until: "2017-09-24",
        location: "Frankfurt",
        target_audience: "international",
        focus: "new cars",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "2017 IAA Frankfurt",
            date_from: "2017-09-14",
            date_until: "2017-09-24",
            location: "Frankfurt",
            target_audience: "international",
            focus: "new cars",
        })
})
