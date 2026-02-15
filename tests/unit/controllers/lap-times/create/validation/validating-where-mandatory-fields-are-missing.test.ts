import {expect, test} from 'vitest'
import {CreateLapTimeRawInput} from "../../../../../../src/controllers/lap-times/types/CreateLapTimeRawInput"
import {validate} from "../../../../../../src/controllers/lap-times/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateLapTimeRawInput = {
        time: undefined,
        driver_name: undefined,
        date: "1996-08-03",
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
