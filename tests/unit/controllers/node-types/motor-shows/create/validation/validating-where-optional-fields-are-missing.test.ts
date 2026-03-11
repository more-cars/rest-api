import {expect, test} from 'vitest'
import {CreateMotorShowRawInput} from "../../../../../../../src/controllers/node-types/motor-shows/types/CreateMotorShowRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/motor-shows/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateMotorShowRawInput = {
        name: "2017 IAA Frankfurt",
        date_from: undefined,
        date_until: undefined,
        location: undefined,
        target_audience: undefined,
        focus: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
