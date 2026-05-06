import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"
import type {CreateLapTimeRawInput} from "../../../../../../../src/controllers/node-types/lap-times/types/CreateLapTimeRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateLapTimeRawInput = {
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
        date: "1996-08-03",
    }

    const result = unmarshalInputData(data, [
        'time',
        'driver_name',
        'date',
    ])

    expect(result)
        .toStrictEqual({
            time: "PT1M33.294S",
            driver_name: "Klaus Ludwig",
            date: "1996-08-03",
        })
})
