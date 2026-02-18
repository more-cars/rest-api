import {expect, test} from 'vitest'
import {CreateLapTimeRawInput} from "../../../../../../src/controllers/node-types/lap-times/types/CreateLapTimeRawInput"
import {validate} from "../../../../../../src/controllers/node-types/lap-times/create"

test.each([
    [true, "Klaus Ludwig", "WBA"],
    ["PT1M33.294S", true, "WBA"],
    ["PT1M33.294S", "Klaus Ludwig", false],
])('validating a request where the fields have invalid data types', async (
    time, driver_name, date
) => {
    const data: CreateLapTimeRawInput = {
        time,
        driver_name,
        date,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
