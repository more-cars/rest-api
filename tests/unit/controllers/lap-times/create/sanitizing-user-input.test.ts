import {describe, expect, test} from 'vitest'
import {CreateLapTimeInput} from "../../../../../src/models/node-types/lap-times/types/CreateLapTimeInput"
import {sanitize} from "../../../../../src/controllers/node-types/lap-times/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateLapTimeInput = {
            time: "   PT1M33.294S  ",
            driver_name: "   Klaus Ludwig  ",
            date: "   1996-08-03  ",
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                time: "PT1M33.294S",
                driver_name: "Klaus Ludwig",
                date: "1996-08-03",
            })
    })
})
