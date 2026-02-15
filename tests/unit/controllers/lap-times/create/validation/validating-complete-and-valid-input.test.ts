import {expect, test} from 'vitest'
import {CreateLapTimeRawInput} from "../../../../../../src/controllers/lap-times/types/CreateLapTimeRawInput"
import {validate} from "../../../../../../src/controllers/lap-times/create"

test('validating a complete and valid request', async () => {
    const data: CreateLapTimeRawInput = {
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
        date: "1996-08-03",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
