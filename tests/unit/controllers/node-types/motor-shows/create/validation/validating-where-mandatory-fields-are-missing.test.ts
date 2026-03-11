import {expect, test} from 'vitest'
import {CreateMotorShowRawInput} from "../../../../../../../src/controllers/node-types/motor-shows/types/CreateMotorShowRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/motor-shows/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateMotorShowRawInput = {
        name: undefined,
        date_from: "2017-09-14",
        date_until: "2017-09-24",
        location: "Frankfurt",
        target_audience: "international",
        focus: "new cars",
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
