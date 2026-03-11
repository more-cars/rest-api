import {expect, test} from 'vitest'
import {CreateMotorShowRawInput} from "../../../../../../../src/controllers/node-types/motor-shows/types/CreateMotorShowRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/motor-shows/create"

test('validating a complete and valid request', async () => {
    const data: CreateMotorShowRawInput = {
        name: "2017 IAA Frankfurt",
        date_from: "2017-09-14",
        date_until: "2017-09-24",
        location: "Frankfurt",
        target_audience: "international",
        focus: "new cars",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
