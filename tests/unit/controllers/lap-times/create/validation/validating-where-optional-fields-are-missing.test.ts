import {expect, test} from 'vitest'
import {CreateLapTimeRawInput} from "../../../../../../src/controllers/node-types/lap-times/types/CreateLapTimeRawInput"
import {validate} from "../../../../../../src/controllers/node-types/lap-times/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateLapTimeRawInput = {
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
        date: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
