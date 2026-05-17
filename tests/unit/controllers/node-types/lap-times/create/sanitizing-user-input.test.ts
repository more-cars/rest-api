import {describe, expect, test} from 'vitest'
import type {LapTimeInput} from "../../../../../../src/models/node-types/lap-times/types/LapTimeInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: LapTimeInput = {
            time: "   PT1M33.294S  ",
            driver_name: "   Klaus Ludwig  ",
            date: "   1996-08-03  ",
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
})
